import { fromFileUrl, join } from '$std/path/mod.ts'
import { cachedEnv, getEnv } from '../../../helpers/lib/environment.ts'

export const handler = {
	/**
	 * @description Direct WKD Policy. Handles GET requests to retrieve the WKD policy file for the specified domain.
	 * @returns A promise that resolves to a Response object containing the policy file
	 * with 'application/octet-stream' content type, or a 404 Not Found response if the file is not found.
	 */
	async GET(): Promise<Response> {
		const __dirname: Readonly<string> = fromFileUrl(new URL('.', import.meta.url))

		try {
			const domain: Readonly<string> = cachedEnv.app.isProduction ? getEnv.string('/app/hostname') ?? '' : 'nvll.me'
			const policyPath: Readonly<string> = join(__dirname, '../../../static/.well-known/openpgpkey', domain, 'policy')
			const policy: Readonly<Uint8Array> = await Deno.readFile(policyPath)

			return new Response(policy, {
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
