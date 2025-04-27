import PrimaryButton from '../../../../components/primary-button.tsx'

import { JSX } from 'preact/jsx-runtime'

export default function SystemNvll(): JSX.Element {
	return (
		<section className='system-nvll'>
			<header>
				<h4>System NVLL</h4>
				<p>
					Operated by an individual and intended for public use, it is designed with user security and privacy in mind. Please use it responsibly; misuse may
					result in consequences if discovered.
				</p>
			</header>
			<div className='content'>
				<div className='cta'>
					<a className='anchor-text' href='https://access.nvll.me/about'>Learn more</a>
					<a className='anchor-text' href='https://access.nvll.me'>
						<PrimaryButton>Access</PrimaryButton>
					</a>
				</div>
			</div>
		</section>
	)
}
