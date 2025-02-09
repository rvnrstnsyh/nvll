import { JSX } from 'preact/jsx-runtime'
import { asset } from '$fresh/runtime.ts'
import { defineApp, RouteContext } from '$fresh/server.ts'

export default defineApp((_request: Request, ctx: RouteContext<void, State>): JSX.Element => {
	const onionLocation: string = `http://${Deno.env.get('APP_HOSTNAME_V3')?.toLowerCase()}${ctx.url.pathname}`

	return (
		// <!DOCTYPE html>
		<html lang='en'>
			<head>
				<meta charset='UTF-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				{ctx.state.context.useDarkNet && <meta http-equiv='onion-location' content={onionLocation} />}
				<link rel='icon' href={asset('ico/favicon.ico')} type='image/x-icon' />
				<link rel='stylesheet' href={asset('css/styles.css')} />
				<title>Developer Insights | NVLL</title>
			</head>
			<body>
				<ctx.Component />
			</body>
		</html>
	)
})
