import { JSX } from 'preact/jsx-runtime'

export default function Privacy(): JSX.Element {
	return (
		<section className='privacy'>
			<header>
				<h1 className='title'>Privacy</h1>
				<p className='paragraph'>
					This site performs no web tracking or personal data collection of any kind. Your privacy remains entirely uncompromised when you browse this website.
					Though JavaScript-based, it remains secure, with execution handled by the server. You're welcome.
				</p>
			</header>
		</section>
	)
}
