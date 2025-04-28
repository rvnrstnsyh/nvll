import PrimaryButton from '../../../../components/primary-button.tsx'

import { JSX } from 'preact/jsx-runtime'
import { anchorRel, anchorTarget } from '../../../../helpers/var/attributes.ts'

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
					<a className='anchor-text' href='https://access.nvll.me/about' rel={anchorRel} target={anchorTarget}>Learn more</a>
					<a className='anchor-text' href='https://access.nvll.me' rel={anchorRel} target={anchorTarget}>
						<PrimaryButton>Access</PrimaryButton>
					</a>
				</div>
			</div>
		</section>
	)
}
