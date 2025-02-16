import Navigation from '../../../components/navigation.tsx'

import { JSX } from 'preact/jsx-runtime'
import { defineLayout, RouteContext } from '$fresh/server.ts'

export default defineLayout((_request: Request, ctx: RouteContext<void, unknown>): JSX.Element => {
	return (
		<main className='reposts-layout'>
			<div className='overlay' />
			<div className='container'>
				<section className='reposts'>
					<ctx.Component />
				</section>
				<Navigation bottom currentYear={new Date().getFullYear()} />
			</div>
		</main>
	)
})
