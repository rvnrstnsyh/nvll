import PrimaryButton from '../../../../components/primary-button.tsx'

import { JSX } from 'preact/jsx-runtime'

export default function System(): JSX.Element {
	return (
		<section className='system'>
			<header>
				<h4>System NVLL</h4>
				<p>
					Web-based decentralized identifiers and Web Key Directory enable public key discovery, identity verification, and key management without third-party
					registries or blockchain infrastructure.
				</p>
			</header>
			<div className='content'>
				<div className='cta'>
					<a className='anchor-text' href=''>Learn more</a>
					<PrimaryButton>Access</PrimaryButton>
				</div>
			</div>
		</section>
	)
}
