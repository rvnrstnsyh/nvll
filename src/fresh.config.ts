import tailwind from '$fresh/plugins/tailwind.ts'

import { Context } from './fresh.context.ts'
import { defineConfig, InnerRenderFunction, RenderContext } from '$fresh/server.ts'

await Context.initialize()

export type RenderFunction = (ctx: RenderContext, render: InnerRenderFunction) => void | Promise<void>

export default defineConfig({
	server: {
		// Server private key in PEM format.
		// cert: '',
		// Cert chain in PEM format.
		// key: '',
		/**
		 * A literal IP address or host name that can be resolved to an IP address.
		 * __Note about `0.0.0.0`__ While listening `0.0.0.0` works on all platforms,
		 * the browsers on Windows don't work with the address `0.0.0.0`.
		 * You should show the message like `server running on localhost:8080` instead of
		 * `server running on 0.0.0.0:8080` if your program supports Windows.
		 * @default {"0.0.0.0"}
		 */
		hostname: Deno.env.get('APP_HOSTNAME') || '0.0.0.0',
		/** The port to listen on.
		 * @default {8000} */
		port: Deno.env.get('APP_PORT') || 8000,
		// Sets `SO_REUSEPORT` on POSIX systems.
		reusePort: false,
		// The handler to invoke when route handlers throw an error.
		onError: (error: Error): Response | Promise<Response> => {
			return new Response(error.message, { status: 500 })
		},
		// The callback which is called when the server starts listening.
		onListen: (params: { hostname: string; port: number; transport: string }): void => {
			// deno-lint-ignore no-console
			console.log(`Listening on http://${params.hostname}:${params.port}`)
		},
	},
	router: {
		/**
		 *  Controls whether Fresh will append a trailing slash to the URL.
		 *  @default {false}
		 */
		trailingSlash: false,
		/**
		 * Serve fresh from a base path instead of from the root.
		 * e.g. "/foo/bar" -> http://localhost:8000/foo/bar
		 * @default {undefined}
		 */
		basePath: undefined,
	},
	/**
	 * The directory to serve static files from.
	 * @default {'./static'}
	 */
	staticDir: './static',
	build: {
		/**
		 * The directory to write generated files to when `dev.ts build` is run.
		 * This can be an absolute path, a file URL or a relative path.
		 * @default {'./_fresh'}
		 */
		outDir: './_dist',
		/**
		 * This sets the target environment for the generated code. Newer
		 * language constructs will be transformed to match the specified
		 * support range. See https://esbuild.github.io/api/#target
		 * @default {"es2022"}
		 */
		target: ['es2022'],
	},
	plugins: [tailwind()],
})
