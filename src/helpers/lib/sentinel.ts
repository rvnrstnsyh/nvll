// deno-lint-ignore-file no-console

import { FreshContext } from '$fresh/server.ts'
import { HELMET_CSP_HEADER, HELMET_DEFAULT_HEADERS, HELMET_PERMISSIONS_POLICY_HEADER } from '../var/helmet-csp.ts'
import { SENTINEL_CSP_HEADER, SENTINEL_DEFAULT_HEADERS, SENTINEL_PERMISSIONS_POLICY_HEADER } from '../var/sentinel-csp.ts'

// Types with readonly properties.
type RateLimitMap = {
	readonly count: number
	readonly timestamp: number
}

type RateLimitResult = {
	readonly rateLimited: boolean
	readonly rateLimitCount: number
}

type Config = {
	readonly RATE_LIMIT: number
	readonly RATE_LIMIT_WINDOW: number
	readonly RATE_LIMIT_METHOD_EXCLUDE: ReadonlySet<string>
	readonly ALLOWED_ORIGINS: Set<string>
}

type FileSettings = {
	readonly type?: string
	readonly disposition?: boolean
	readonly cache?: boolean
}

export default class Sentinel {
	private static readonly CONFIG: Config = {
		RATE_LIMIT: 1000,
		RATE_LIMIT_WINDOW: 60 * 60 * 1000, // 1 hour.
		RATE_LIMIT_METHOD_EXCLUDE: new Set(['HEAD', 'OPTIONS']),
		ALLOWED_ORIGINS: new Set(Deno.env.get('APP_ORIGINS')?.split(',').map((s: string) => s.trim()) || ['http://localhost', 'http://127.0.0.1']),
	}
	private static readonly RATE_LIMIT_CLIENTS: Map<string, RateLimitMap> = new Map<string, RateLimitMap>()
	private static readonly FILE_SETTINGS: Readonly<Record<string, FileSettings>> = {
		pdf: { disposition: true, cache: true },
		eml: { type: 'text/plain; charset=utf-8', disposition: true },
		asc: { type: 'text/plain; charset=utf-8', disposition: true },
	} as const
	private static readonly HEADERS_TO_REMOVE: ReadonlySet<string> = new Set([
		'Server',
		'X-Powered-By',
		'X-AspNet-Version',
		'X-AspNetMvc-Version',
	])
	private static cleanupInterval: number | undefined
	private constructor() {}
	/**
	 * Starts the interval to clean up the rate limit entries.
	 *
	 * @description The interval is started when the first request is received and it will be triggered
	 * every `RATE_LIMIT_WINDOW` milliseconds. The interval will be stopped when the server is stopped.
	 */
	private static resetInterval(): void {
		if (!this.cleanupInterval) this.cleanupInterval = setInterval(() => this.resetRateLimits(), this.CONFIG.RATE_LIMIT_WINDOW)
	}
	/**
	 * Resets the rate limit entries that are older than `RATE_LIMIT_WINDOW` milliseconds.
	 *
	 * @description This method is called every `RATE_LIMIT_WINDOW` milliseconds to clean up the rate limit entries.
	 * The entries are checked against the current timestamp and if they are older than `RATE_LIMIT_WINDOW` milliseconds,
	 * they are removed from the map.
	 */
	private static resetRateLimits(): void {
		const now: number = Date.now()
		const window: number = this.CONFIG.RATE_LIMIT_WINDOW

		for (const [ip, data] of this.RATE_LIMIT_CLIENTS) {
			if (now - data.timestamp > window) {
				this.RATE_LIMIT_CLIENTS.delete(ip)
			}
		}
	}
	/**
	 * @description Checks if the client has exceeded the rate limit.
	 * @param remoteIp The IP address of the client.
	 * @param method The HTTP method of the request.
	 * @returns An object with `rateLimited` and `rateLimitCount` properties.
	 * `rateLimited` is a boolean indicating whether the rate limit was exceeded, and `rateLimitCount`
	 * is the current count of requests from the client.
	 */
	private static rateLimit(remoteIp: string, method: string): RateLimitResult {
		this.resetInterval()

		if (this.CONFIG.RATE_LIMIT_METHOD_EXCLUDE.has(method)) return { rateLimited: false, rateLimitCount: 0 }

		const now: number = Date.now()
		const clientData: RateLimitMap | undefined = this.RATE_LIMIT_CLIENTS.get(remoteIp)

		if (!clientData || (now - clientData.timestamp > this.CONFIG.RATE_LIMIT_WINDOW)) {
			this.RATE_LIMIT_CLIENTS.set(remoteIp, { count: 1, timestamp: now })
			return { rateLimited: false, rateLimitCount: 1 }
		}

		const newCount: number = clientData.count + 1
		this.RATE_LIMIT_CLIENTS.set(remoteIp, { count: newCount, timestamp: clientData.timestamp })

		return {
			rateLimited: newCount > this.CONFIG.RATE_LIMIT,
			rateLimitCount: newCount,
		}
	}
	/**
	 * @description Returns a response with a 429 status code and a Rate-Limit-Remaining header.
	 * @param rateLimitCount The current count of requests from the client.
	 * @param isDarkNet Whether the request is from the dark net.
	 * @param startTime The start time of the request.
	 * @returns A response with a 429 status code and a Rate-Limit-Remaining header.
	 */
	private static rateLimitedResponse(rateLimitCount: number, isDarkNet: boolean, startTime: number): Response {
		const headers: Headers = new Headers()
		this.setSecurityHeaders(headers, rateLimitCount, isDarkNet, startTime)
		return new Response('429 Too Many Requests', { status: 429, headers })
	}
	/**
	 * @description Sets various security headers on the provided `headers` object. This method configures
	 * default security headers based on whether the request is from the dark net or not. It also
	 * manages rate limit headers and calculates the response time.
	 * @param headers The Headers object to which the security headers will be added.
	 * @param rateLimitCount The current count of requests from the client. Used to set rate limit headers.
	 * @param isDarkNet A boolean indicating if the request is from the dark net. Determines which set of default headers to use.
	 * @param startTime The start time of the request, used to calculate the response time.
	 * @returns A string representing the response time in milliseconds.
	 */
	private static setSecurityHeaders(headers: Headers, rateLimitCount: number, isDarkNet: boolean, startTime: number): string {
		const DEFAULT_HEADERS: Readonly<Map<string, string>> = isDarkNet ? SENTINEL_DEFAULT_HEADERS : HELMET_DEFAULT_HEADERS
		const CSP_HEADER: Readonly<Record<string, string>> = isDarkNet ? SENTINEL_CSP_HEADER : HELMET_CSP_HEADER
		const PERMISSIONS_POLICY: Readonly<string> = isDarkNet ? SENTINEL_PERMISSIONS_POLICY_HEADER : HELMET_PERMISSIONS_POLICY_HEADER

		DEFAULT_HEADERS.forEach((value: string, key: string) => headers.set(key, value))

		const LOCAL_ORIGINS: string[] = ['http://localhost', 'http://127.0.0.1', 'http://0.0.0.0']

		if (Deno.env.get('APP_ENV') === 'production') {
			LOCAL_ORIGINS.forEach((origin: string) => this.CONFIG.ALLOWED_ORIGINS.delete(origin))
		} else {
			LOCAL_ORIGINS.forEach((origin: string) => this.CONFIG.ALLOWED_ORIGINS.add(origin))
		}

		if (isDarkNet) {
			const hostname: string | undefined = Deno.env.get('APP_HOSTNAME_V3')
			if (hostname) {
				this.CONFIG.ALLOWED_ORIGINS.add(`http://${hostname}`)
			}
		}

		headers.set('Access-Control-Allow-Origin', Array.from(this.CONFIG.ALLOWED_ORIGINS).join(', '))
		headers.set('Content-Security-Policy', Object.entries(CSP_HEADER).map(([directive, value]: [string, string]) => `${directive} ${value}`).join('; '))
		headers.set('Permissions-Policy', PERMISSIONS_POLICY)

		if (rateLimitCount !== Infinity) {
			headers.set('X-Rate-Limit', `${rateLimitCount}/${this.CONFIG.RATE_LIMIT}`)
			headers.set('X-Rate-Limit-Remaining', `${Math.max(0, this.CONFIG.RATE_LIMIT - rateLimitCount)}`)
		}

		const responseTime: string = `${(performance.now() - startTime).toFixed(2)}ms`
		headers.set('X-Response-Time', responseTime)

		this.HEADERS_TO_REMOVE.forEach((header: string) => headers.delete(header))

		return responseTime
	}
	/**
	 * @description Modifies the response headers for static files. This middleware method adds
	 * security headers, sets the Content-Disposition header for certain file types, and sets
	 * the Content-Type header for certain file types. It only modifies the response headers
	 * if the request is for a static file (i.e. the file extension matches one of the keys
	 * in `FILE_SETTINGS`).
	 * @param startTime The start time of the request.
	 * @param ctx The Fresh context object.
	 * @returns A response with modified headers.
	 */
	public static async static(startTime: number, ctx: FreshContext<State>): Promise<Response> {
		const nextResponse: Response = await ctx.next()
		const pathname: string = ctx.url.pathname
		const fileExtension: string | undefined = pathname.match(/\.([0-9a-z]+)(?:[?#]|$)/i)?.[1]?.toLowerCase()

		if (!fileExtension) return nextResponse

		const filename: string = pathname.split('/').pop() || 'unknown'
		const contentType: string = nextResponse.headers.get('content-type') || ''
		const headers: Headers = new Headers(nextResponse.headers)
		const isDarkNet: boolean = ctx.state.context.useDarkNet && ctx.url.hostname === Deno.env.get('APP_HOSTNAME_V3')

		this.setSecurityHeaders(headers, Infinity, isDarkNet, startTime)

		const settings: FileSettings = this.FILE_SETTINGS[fileExtension]
		if (settings) {
			if (fileExtension === 'pdf' && contentType.includes('application/pdf')) {
				headers.set('Cache-Control', 'public, max-age=31536000')
			} else if (
				(fileExtension === 'eml' && contentType.includes('message/rfc822')) ||
				(fileExtension === 'asc' && contentType.includes('application/pgp-keys'))
			) {
				headers.set('Content-Type', settings.type || contentType)
			}
			if (settings.disposition) {
				headers.set('Content-Disposition', `inline; filename='${filename}'`)
			}
		}
		return new Response(nextResponse.body, {
			status: nextResponse.status,
			statusText: nextResponse.statusText,
			headers,
		})
	}

	/**
	 * @description Processes incoming route requests, applying rate limiting, security headers, and logging.
	 * Determines if a request is from the dark net, handles rate limiting, and sets security headers.
	 * Logs requests unless they are CSP reports with logging disabled.
	 * @param {string} remoteIp - The IP address of the client making the request.
	 * @param {string} pathname - The path of the requested route.
	 * @param {string} method - The HTTP method of the request.
	 * @param {number} startTime - The start time of the request, used for calculating response time.
	 * @param {FreshContext<State>} ctx - The context object, which includes state and URL information.
	 * @returns {Promise<Response>} A promise resolving to the response object, either from the next
	 * middleware or an error response if an exception occurs.
	 */
	public static async route(remoteIp: string, pathname: string, method: string, startTime: number, ctx: FreshContext<State>): Promise<Response> {
		const isDarkNet: boolean = ctx.state.context.useDarkNet && ctx.url.hostname === Deno.env.get('APP_HOSTNAME_V3')
		const { rateLimited, rateLimitCount }: RateLimitResult = this.rateLimit(remoteIp, method)

		if (rateLimited) return this.rateLimitedResponse(rateLimitCount, isDarkNet, startTime)

		try {
			const nextResponse: Response = await ctx.next()
			const responseTime: string = this.setSecurityHeaders(nextResponse.headers, rateLimitCount, isDarkNet, startTime)
			const cspReportRequest: boolean = pathname === '/api/v0/csp/report' && !JSON.parse(Deno.env.get('APP_WRITE_CSP_REPORT') || 'false')

			if (!cspReportRequest) console.log(`${new Date().toISOString()}; ${remoteIp}; ${method}; ${pathname}; ${responseTime}`)

			return nextResponse
		} catch (error) {
			console.log('Sentinel middleware error:', error instanceof Error ? error.message : error)
			const errorResponse: Response = new Response('500 Internal Server Error', { status: 500 })
			this.setSecurityHeaders(errorResponse.headers, rateLimitCount, isDarkNet, startTime)
			return errorResponse
		}
	}
}
