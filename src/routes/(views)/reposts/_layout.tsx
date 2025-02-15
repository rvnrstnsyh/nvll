import Navigation from '../../../components/navigation.tsx'

import { JSX } from 'preact/jsx-runtime'
import { defineLayout, RouteContext } from '$fresh/server.ts'

export default defineLayout((_request: Request, ctx: RouteContext<void, unknown>): JSX.Element => {
	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-100'>
			<div className="overlay fixed bg-[url('../png/background.png')] bg-no-repeat bg-cover z-10 w-full max-w-lg -translate-x-[20%] -translate-y-[30%] md:max-w-[877px] md:translate-y-0 transition-transform duration-300 inset-0" />
			<main className='max-w-screen-sm mx-auto'>
				<section className='z-20 relative flex items-center justify-center overflow-hidden bg-white p-6 my-4 mx-auto shadow-md sm:rounded-lg transition-all duration-300'>
					<ctx.Component />
				</section>
				<Navigation bottom currentYear={new Date().getFullYear()} />
			</main>
		</div>
	)
})
