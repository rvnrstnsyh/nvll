import { JSX } from 'preact/jsx-runtime'
import { asset } from '$fresh/runtime.ts'
import { defineRoute, RouteContext } from '$fresh/server.ts'

export default defineRoute((_request: Request, _ctx: RouteContext<void, State>): JSX.Element => {
	return (
		<section className='home'>
			<header>
				<div className='link'>
					[<a href='eml/developer-insights_nvll_2025-02-07T19_24_15+07_00.eml'>Source Message</a>]
				</div>
				<p>
					Bandung, Indonesia<br />07 February 2025
				</p>
			</header>
			<br />
			<br />
			<blockquote>
				<img className='quote' src={asset('png/quote.png')} alt='Quote' />
				<div className='content'>
					<p className='paragraph'>
						<em>
							Glad to see you here.<br />Allow me to briefly introduce myself.
						</em>
					</p>
					<br />
					<p className='paragraph'>
						<em>
							As an advocate of Free and Open Source Software (FOSS) and an experienced Software Developer, I bring extensive expertise in web development
							and system architecture. Holding a Bachelor's degree in Informatics (Computer Science), I blend academic knowledge with hands-on experience in
							programming, cloud computing, and system administration.
						</em>
					</p>
					<br />
					<p className='paragraph'>
						<em>
							My core competencies include full-stack web application development, with specialized proficiency in JavaScript, PHP, Python, and SQL. I focus
							on designing robust, scalable solutions that adhere to modern development practices and security standards. Whether it's custom JavaScript
							applications or comprehensive web solutions, I am committed to delivering results that exceed expectations through meticulous attention to
							detail and industry best practices.
						</em>
					</p>
					<br />
					<p className='paragraph'>
						<em>
							Leveraging this expertise, I also provide a free and open-source public service. While this platform may not be directly accessible here due
							to network restrictions, it remains available to those who find it relevant. I refer to it as Non-Violable Liberty Layers.
						</em>
					</p>
					<br />
					<p className='paragraph'>
						<em>
							For business inquiries, collaborations, or consultations regarding software development, please feel free to reach out using the contact
							details provided. If preferred, you can encrypt your message using my attached PGP public key.
						</em>
					</p>
					<br />
					<p className='paragraph'>
						<em>
							Thank you for your time. Have a nice day.
						</em>
					</p>
					<p className='signature'>
						<em>
							---<br />Sincerely,
						</em>
					</p>
				</div>
				<footer>
					<div className='left'>
						<img className='avatar' src={asset('jpg/avatar_default_0-20230707-0001.jpg')} alt='Avatar' />
						<div className='bio'>
							<p className='name'>Rivane Rasetiansyah</p>
							<p className='description'>
								JavaScript Developer
								<br />
								[<a href='https://etherscan.io/address/0x0000047189d70937321EEc75E5F222A0F4000094'>Tips</a>]
							</p>
						</div>
					</div>
					<div className='right'>
						<img className='logo' src={asset('png/logo.png')} alt='Logo' />
					</div>
				</footer>
			</blockquote>
		</section>
	)
})
