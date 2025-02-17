import Letter from './(_components)/letter.tsx'
import Contact from './(_components)/contact.tsx'
import Privacy from './(_components)/privacy.tsx'
import Navigation from '../../../components/navigation.tsx'

import { JSX } from 'preact/jsx-runtime'
import { Head } from '$fresh/runtime.ts'
import { defineRoute, RouteContext } from '$fresh/server.ts'

export default defineRoute((_request: Request, _ctx: RouteContext<void, unknown>): JSX.Element => {
	return (
		<main className='home'>
			<Head>
				<meta name='description' content='Rivane Rasetiansyah – Software Developer and advocate of Free and Open Source Software (FOSS).' />
				<meta name='keywords' content='Rivane Rasetiansyah, Software Developer, Full-Stack Developer, JavaScript, Open Source, FOSS' />
			</Head>

			<div className='alpha'>
				<Navigation />
				<div className='container'>
					<Letter />
				</div>
			</div>

			<div className='bravo'>
				<div className='container'>
					<Privacy />
				</div>
				<div className='container'>
					<Contact />
				</div>
				<Navigation bottom currentYear={new Date().getFullYear()} />
			</div>
		</main>
	)
})
