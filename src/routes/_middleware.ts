// deno-lint-ignore-file no-console

import Sentinel from '../helpers/lib/sentinel.ts'

import { Context } from '../fresh.context.ts'
import { FreshContext } from '$fresh/server.ts'

/**
 * @description Handles incoming requests and returns a response, applies security headers,
 * and logs requests to the console. this middleware is called for every request (global).
 * @param {Request} request - The incoming request object.
 * @param {FreshContext<State>} ctx - The context object containing state.
 * @return {Promise<Response>} A promise that resolves to the response object.
 */
export async function handler(request: Request, ctx: FreshContext<State>): Promise<Response> {
	const startTime: number = performance.now()
	const remoteIp: string = request.headers.get('X-Forwarded-For') || ctx.remoteAddr.hostname
	const pathname: string = ctx.url.pathname
	const method: string = request.method

	try {
		// Memoize context initialization.
		ctx.state.context ??= await Context.initialize()
		// Handle 404 Not Found.
		if (ctx.destination === 'notFound') return new Response('404 Not Found', { status: 404 })
		// Handle WebSockets.
		if (request.headers.get('upgrade')?.toLowerCase() === 'websocket') new Response('426 Upgrade Required', { status: 426 })
		// Handle static files.
		if (ctx.destination === 'static') return await Sentinel.static(startTime, ctx)
		// Handle routes and static files.
		if (ctx.destination === 'route') return await Sentinel.route(remoteIp, pathname, method, startTime, ctx)
		// Default fallback.
		return ctx.next()
	} catch (error) {
		console.error('Global middleware error:', error instanceof Error ? error.message : error)
		return new Response('Internal Server Error', { status: 500 })
	}
}
