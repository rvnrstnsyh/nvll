import { FreshContext } from '$fresh/server.ts'
import { fromFileUrl, join } from '$std/path/mod.ts'

export const handler = {
	/**
	 * @description Advanced WKD Policy. Handles GET requests to retrieve the policy file for the specified domain.
	 * @param _request - The HTTP request object.
	 * @param ctx - The context object containing route parameters.
	 * @returns A promise that resolves to a Response object containing the policy file
	 * with 'application/octet-stream' content type, or a 404 Not Found response if the file is not found.
	 */
	async GET(_request: Request, ctx: FreshContext): Promise<Response> {
		const __dirname: Readonly<string> = fromFileUrl(new URL('.', import.meta.url))

		try {
			const domain: Readonly<string> = ctx.params.domain
			const policyPath: Readonly<string> = join(__dirname, '../../../../static/.well-known/openpgpkey', domain, 'policy')
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
