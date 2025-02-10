import Navigation from '../../../components/navigation.tsx'

import { JSX } from 'preact/jsx-runtime'
import { asset, Head } from '$fresh/runtime.ts'
import { defineLayout, RouteContext } from '$fresh/server.ts'

export default defineLayout((_request: Request, _ctx: RouteContext<void, unknown>): JSX.Element => {
	const currentYear: number = new Date().getFullYear()

	return (
		<section className='home'>
			<Head>
				<meta name='description' content='Rivane Rasetiansyah – Software Developer and advocate of Free and Open Source Software (FOSS).' />
				<meta name='keywords' content='Rivane Rasetiansyah, Software Developer, Full-Stack Developer, JavaScript, Open Source, FOSS' />
			</Head>

			<div className='overlay'></div>

			<div className='alpha'>
				<Navigation />
				<div className='container'>
					<section className='letter'>
						<header>
							<div className='link'>
								[<a className='anchor-text' href='eml/developer-insights_nvll_2025-02-07T19_24_15+07_00.eml'>Source Message</a>]
							</div>
							<p>
								Bandung, Indonesia<br />07 February 2025
							</p>
						</header>
						<blockquote>
							<img className='quote' src={asset('png/quote.png')} alt='Quote' />
							<div className='content'>
								<p className='paragraph'>
									<em>
										Glad to see you here.<br />Allow me to briefly introduce myself.
									</em>
								</p>
								<p className='paragraph'>
									<em>
										As an advocate of Free and Open Source Software (FOSS) and an experienced Software Developer, I bring extensive expertise in web
										development and system architecture. Holding a Bachelor's degree in Informatics (Computer Science), I blend academic knowledge
										with hands-on experience in programming, cloud computing, and system administration.
									</em>
								</p>
								<p className='paragraph'>
									<em>
										My core competencies include full-stack web application development, with specialized proficiency in JavaScript, PHP, Python, and
										SQL. I focus on designing robust, scalable solutions that adhere to modern development practices and security standards. Whether
										it's custom JavaScript applications or comprehensive web solutions, I am committed to delivering results that exceed expectations
										through meticulous attention to detail and industry best practices.
									</em>
								</p>
								<p className='paragraph'>
									<em>
										Leveraging this expertise, I also provide a free and open-source public service. While this platform may not be directly
										accessible here due to network restrictions, it remains available to those who find it relevant. I refer to it as Non-Violable
										Liberty Layers.
									</em>
								</p>
								<p className='paragraph'>
									<em>
										For business inquiries, collaborations, or consultations regarding software development, please feel free to reach out using the
										contact details provided. If preferred, you can encrypt your message using my attached PGP public key.
									</em>
								</p>
								<p className='paragraph'>
									<em>
										Thank you for your time. Have a nice day.<br />
										<span className='signature'>
											---<br />Sincerely,
										</span>
									</em>
								</p>
							</div>
							<footer>
								<div className='left'>
									<img className='avatar' src={asset('jpg/avatar_default_0-20230707-0001.jpg')} alt='Avatar' />
									<div className='bio'>
										<p className='name'>Rivane Rasetiansyah</p>
										<p className='description'>JavaScript Developer</p>
									</div>
								</div>
								<div className='right'>
									<img className='logo' src={asset('png/logo.png')} alt='Logo' />
								</div>
							</footer>
						</blockquote>
					</section>
				</div>
			</div>

			<div className='bravo'>
				<div className='container'>
					<section className='contact'>
						<header>
							<h1 className='title'>Contact Information</h1>
							<p className='paragraph'>
								For those who want to connect, (preferably) contact me via email. Alternatively, you can contact me in several other places:
							</p>
						</header>
						<div className='content'>
							<ul>
								{[
									{
										name: 'Email',
										src: 'png/email-logo.png',
										link: 'mailto:re@nvll.me',
										text: 're@nvll.me',
									},
									{
										name: 'LinkedIn',
										src: 'png/linkedin-logo.png',
										link: 'https://www.linkedin.com/in/rvnrstnsyh',
										text: 'www.linkedin.com/in/rvnrstnsyh',
									},
									{
										name: 'Mastodon',
										src: 'png/mastodon-logo.png',
										link: 'https://infosec.exchange/@rvnrstnsyh',
										text: '@rvnrstnsyh@infosec.exchange',
									},
									{
										name: 'Matrix',
										src: 'png/matrix-logo.png',
										link: 'https://matrix.to/#/@rvnrstnsyh:infosec.exchange',
										text: '@rvnrstnsyh:infosec.exchange',
									},
									{
										name: 'Pixelfed',
										src: 'png/pixelfed-logo.png',
										link: 'https://pixel.infosec.exchange/rvnrstnsyh',
										text: '@rvnrstnsyh@pixel.infosec.exchange',
									},
								].map(({ name, src, link, text }: { name: string; src: string; link: string; text: string }): JSX.Element => (
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
				</div>
				<Navigation currentYear={currentYear} />
			</div>
		</section>
	)
})
