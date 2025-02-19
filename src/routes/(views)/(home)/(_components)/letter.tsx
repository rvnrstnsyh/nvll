import { JSX } from 'preact/jsx-runtime'
import { asset } from '$fresh/runtime.ts'

export default function Letter(): JSX.Element {
	return (
		<section className='letter'>
			<header>
				<div className='link'>
					[<a className='anchor-text' href='/eml/developer_insights_nvll-2025-02-14T23_24_33+07_00.eml'>Source Message</a>]
				</div>
				<p>
					Bandung, Indonesia<br />14 February 2025
				</p>
			</header>
			<blockquote>
				<img className='quote' src={asset('/png/quote.png')} alt='Quote' />
				<div className='content'>
					<p>
						<em>
							Glad to see you here.<br />Allow me to briefly introduce myself.
						</em>
					</p>
					<p>
						<em>
							As an advocate of Free and Open Source Software (FOSS) and an experienced Software Developer, I bring extensive expertise in web development
							and system architecture. Holding a Bachelor's degree in Informatics (Computer Science), I blend academic knowledge with hands-on experience in
							programming, cloud computing, and system administration.
						</em>
					</p>
					<p>
						<em>
							My core competencies include full-stack web application development, with specialized proficiency in JavaScript, PHP, Python, and SQL. I focus
							on designing robust, scalable solutions that adhere to modern development practices and security standards. Whether it's custom JavaScript
							applications or comprehensive web solutions, I am committed to delivering results that exceed expectations through meticulous attention to
							detail and industry best practices.
						</em>
					</p>
					<p>
						<em>
							Leveraging this expertise, I also provide a free and open-source public service. While this platform may not be directly accessible here due
							to network restrictions, it remains available to those who find it relevant. I refer to it as Non-Violable Liberty Layers.
						</em>
					</p>
					<p>
						<em>
							For business inquiries, collaborations, or consultations regarding software development, please feel free to reach out using the contact
							details provided. If preferred, you can encrypt your message using my attached PGP public key.
						</em>
					</p>
					<p>
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
						<img className='avatar' src={asset('/jpg/avatar_default_0-20230707-0001.jpg')} alt='Avatar' />
						<div className='bio'>
							<h5>Rivane Rasetiansyah</h5>
							<p className='description'>
								Software Developer
								<br />
								[<a className='anchor-text' href='/asc/publickey.asc'>PGP</a>] [<a className='anchor-text' href='/pdf/curriculum-vitae.pdf'>Resume</a>]
							</p>
						</div>
					</div>
					<div className='right'>
						<img className='logo' src={asset('/png/logo.png')} alt='Logo' />
					</div>
				</footer>
			</blockquote>
		</section>
	)
}
