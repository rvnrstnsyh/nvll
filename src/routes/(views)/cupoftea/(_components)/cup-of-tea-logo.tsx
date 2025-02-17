import { JSX } from 'preact/jsx-runtime'

type CupOfTeaLogoProps = {
	small?: boolean
}

export default function CupOfTeaLogo({ small }: CupOfTeaLogoProps): JSX.Element {
	const Heading: 'h1' | 'h3' = small ? 'h3' : 'h1'
	const size: string = small ? 'w-1.5 h-1.5' : 'w-2.5 h-2.5'

	return (
		<Heading className='cupoftea-logo'>
			cup
			<div className={`wrapper ${size}`}>
				<span className={`dot ${size}`}></span>
			</div>
			ftea
		</Heading>
	)
}
