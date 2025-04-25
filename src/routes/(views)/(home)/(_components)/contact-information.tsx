import { JSX } from 'preact/jsx-runtime'
import { asset } from '$fresh/runtime.ts'

type Link = {
	name: string
	src: string
	link: string
	rel?: string
	text: string
}

export default function ContactInformation(): JSX.Element {
	const links: Link[] = [
		{ name: 'Email', src: '/png/email-logo.png', link: 'mailto:re@nvll.me', text: 're@nvll.me' },
		{ name: 'Alternative', src: '', link: 'mailto:rasetiansyah@pm.me', text: 'rasetiansyah@pm.me' },
		{ name: 'Matrix', src: '/png/matrix-logo.png', link: 'https://matrix.to/#/@rvnrstnsyh:matrix.org', text: '@rvnrstnsyh:matrix.org' },
		{ name: 'Fediverse', src: '/png/mastodon-logo.png', link: 'https://fosstodon.org/@rvnrstnsyh', rel: 'me', text: '@rvnrstnsyh@fosstodon.org' },
		{ name: 'Bluesky', src: '/png/bluesky-logo.png', link: 'https://bsky.app/profile/nvll.me', text: 'did:plc:4ppcdyvdand6dbvwymwywmf7' },
		{ name: 'LinkedIn', src: '/png/linkedin-logo.png', link: 'https://www.linkedin.com/in/rvnrstnsyh', text: 'www.linkedin.com/in/rvnrstnsyh' },
		{ name: 'GitHub', src: '/png/github-logo.png', link: 'https://github.com/rvnrstnsyh', text: 'github.com/rvnrstnsyh' },
	]
	return (
		<section className='contact-information'>
			<header>
				<h4>Contact Information</h4>
				<p>
					For those who want to connect, (preferably) contact me via email. Alternatively, you can contact me in several other places:
				</p>
			</header>
			<div className='content'>
				<ul>
					{links.map(({ name, src, link, rel, text }: Link): JSX.Element => (
						<li key={name}>
							<div className='img-wrapper'>
								{src !== '' && <img className={name.toLowerCase()} src={asset(src)} alt={name} />}
							</div>
							<p>
								<b>{name}</b> [<a className='anchor-text' href={link} rel={rel}>{text}</a>]
							</p>
						</li>
					))}
				</ul>
				<p>
					Identity claims: <a className='anchor-text' href='https://keyoxide.org/hkp/e2fd809db061dca8'>keyoxide.org/hkp/e2fd809db061dca8</a>
				</p>
			</div>
		</section>
	)
}
