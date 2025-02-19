import { JSX } from 'preact/jsx-runtime'
import { defineLayout, RouteContext } from '$fresh/server.ts'

export default defineLayout((_request: Request, ctx: RouteContext<void, unknown>): JSX.Element => {
	return (
		<main className='home-layout'>
			<div className='overlay' />
			<ctx.Component />
		</main>
	)
})
