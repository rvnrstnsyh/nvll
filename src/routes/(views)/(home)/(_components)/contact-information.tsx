import { JSX } from 'preact/jsx-runtime'
import { asset } from '$fresh/runtime.ts'
import { anchorRel, anchorTarget } from '../../../../helpers/var/attributes.ts'

type Link = {
	name: string
	src: string
	link: string
	text: string
}

export default function ContactInformation(): JSX.Element {
	const links: ReadonlyArray<Link> = [
		{ name: 'Email', src: '/svg/email-logo-min.svg', link: 'mailto:re@nvll.me', text: 're@nvll.me' },
		{ name: 'Alternative', src: '', link: 'mailto:rasetiansyah@pm.me', text: 'rasetiansyah@pm.me' },
		{ name: 'Matrix', src: '/svg/matrix-logo-min.svg', link: 'https://matrix.to/#/@rvnrstnsyh:matrix.org', text: '@rvnrstnsyh:matrix.org' },
		{ name: 'Fediverse', src: '/svg/mastodon-logo-min.svg', link: 'https://fosstodon.org/@rvnrstnsyh', text: '@rvnrstnsyh@fosstodon.org' },
		{ name: 'Bluesky', src: '/svg/bluesky-logo-min.svg', link: 'https://bsky.app/profile/nvll.me', text: 'did:plc:4ppcdyvdand6dbvwymwywmf7' },
		{ name: 'LinkedIn', src: '/svg/linkedin-logo-min.svg', link: 'https://www.linkedin.com/in/rvnrstnsyh', text: 'www.linkedin.com/in/rvnrstnsyh' },
		{ name: 'GitHub', src: '/svg/github-logo-min.svg', link: 'https://github.com/rvnrstnsyh', text: 'github.com/rvnrstnsyh' },
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
					{links.map(({ name, src, link, text }: Link): JSX.Element => {
						const relValue: Readonly<string> = name === 'Fediverse' ? `me ${anchorRel}` : anchorRel
						return (
							<li key={name}>
								<div className='img-wrapper'>
									{src !== '' && <img className={name.toLowerCase()} src={asset(src)} alt={name} />}
								</div>
								<p>
									<b>{name}</b> [<a className='anchor-text' href={link} rel={relValue} target={anchorTarget}>{text}</a>]
								</p>
							</li>
						)
					})}
				</ul>
				<p>
					Identity claims:&nbsp;
					<a className='anchor-text' href='https://keyoxide.org/hkp/e2fd809db061dca8' rel={anchorRel} target={anchorTarget}>
						keyoxide.org/hkp/e2fd809db061dca8
					</a>
				</p>
			</div>
		</section>
	)
}
