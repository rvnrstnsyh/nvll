import { JSX } from 'preact/jsx-runtime'

export default function Privacy(): JSX.Element {
	return (
		<section className='privacy'>
			<header>
				<h4>Privacy</h4>
				<p>
					This site performs no web tracking or personal data collection of any kind. Your privacy remains entirely uncompromised when you browse this website.
					Though JavaScript-based, it remains secure, with execution handled by the server. You're welcome.
				</p>
			</header>
		</section>
	)
}
