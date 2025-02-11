import { JSX } from 'preact/jsx-runtime'
import { asset } from '$fresh/runtime.ts'

type Link = { name: string; src: string; link: string; text: string }

export default function Contact(): JSX.Element {
	const links: Link[] = [
		{ name: 'Email', src: 'png/email-logo.png', link: 'mailto:re@nvll.me', text: 're@nvll.me' },
		{ name: 'LinkedIn', src: 'png/linkedin-logo.png', link: 'https://www.linkedin.com/in/rvnrstnsyh', text: 'www.linkedin.com/in/rvnrstnsyh' },
		{ name: 'Mastodon', src: 'png/mastodon-logo.png', link: 'https://infosec.exchange/@rvnrstnsyh', text: '@rvnrstnsyh@infosec.exchange' },
		{ name: 'Matrix', src: 'png/matrix-logo.png', link: 'https://matrix.to/#/@rvnrstnsyh:infosec.exchange', text: '@rvnrstnsyh:infosec.exchange' },
		{ name: 'Pixelfed', src: 'png/pixelfed-logo.png', link: 'https://pixel.infosec.exchange/rvnrstnsyh', text: '@rvnrstnsyh@pixel.infosec.exchange' },
	]
	return (
		<section className='contact'>
			<header>
				<h1 className='title'>Contact Information</h1>
				<p className='paragraph'>
					For those who want to connect, (preferably) contact me via email. Alternatively, you can contact me in several other places:
				</p>
			</header>
			<div className='content'>
				<ul>
					{links.map(({ name, src, link, text }: Link): JSX.Element => (
						<li key={name}>
							<div className='img-wrapper'>
								<img className={name.toLowerCase()} src={asset(src)} alt={name} />
							</div>
							<p>
								<b>{name}</b> [<a className='anchor-text' href={link}>{text}</a>]
							</p>
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}
