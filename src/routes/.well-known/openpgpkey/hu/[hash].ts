import { FreshContext } from '$fresh/server.ts'
import { fromFileUrl, join } from '$std/path/mod.ts'
import { cachedEnv, getEnv } from '../../../../helpers/lib/environment.ts'

export const handler = {
	/**
	 * @description Direct WKD. Handles GET requests to retrieve OpenPGP key files for the specified domain.
	 * The key is returned with 'application/octet-stream' content type, or a 404 Not Found response if the key is not found.
	 * @param _request - The HTTP request object.
	 * @param ctx - The context object containing route parameters.
	 * @returns A promise that resolves to a Response object containing the requested OpenPGP key file
	 * with 'application/octet-stream' content type, or a 404 Not Found response if the key is not found.
	 */
	async GET(_request: Request, ctx: FreshContext): Promise<Response> {
		const domain: Readonly<string> = cachedEnv.app.isProduction ? getEnv.string('/app/hostname') ?? '' : 'nvll.me'
		const hash: Readonly<string> = ctx.params.hash.toUpperCase()

		// Base32 RFC 4648.
		if (!/^[A-Z2-7]{27,56}$/.test(hash)) return new Response('403 Forbidden', { status: 403 })

		const __dirname: Readonly<string> = fromFileUrl(new URL('.', import.meta.url))

		try {
			const keyPath: Readonly<string> = join(__dirname, '../../../../static/.well-known/openpgpkey', domain, 'hu', hash)
			const key: Readonly<Uint8Array> = await Deno.readFile(keyPath)

			return new Response(key, {
				headers: {
					'Content-Type': 'application/octet-stream',
					'Cache-Control': 'public, immutable, max-age=86400',
				},
			})
		} catch {
			return new Response('404 Not Found', { status: 404 })
		}
	},
}
