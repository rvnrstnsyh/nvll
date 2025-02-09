import Navigation from '../../components/navigation.tsx'

import { JSX } from 'preact/jsx-runtime'
import { asset } from '$fresh/runtime.ts'
import { defineLayout, RouteContext } from '$fresh/server.ts'

export default defineLayout((_request: Request, ctx: RouteContext<void, unknown>): JSX.Element => {
	const currentYear: number = new Date().getFullYear()

	return (
		<section className='main-layout'>
			<img className='background' src={asset('png/background.png')} alt='Background' />
			<div className='alpha'>
				{/* <div className='children-wrapper'></div> */}
			</div>

			<div className='bravo'>
				<Navigation copyright currentYear={currentYear} />
				<div className='children-wrapper'>
					<ctx.Component />
				</div>
				<Navigation copyright currentYear={currentYear} />
			</div>

			<div className='charlie'>
				{/* <div className='children-wrapper'></div> */}
			</div>
		</section>
	)
})
