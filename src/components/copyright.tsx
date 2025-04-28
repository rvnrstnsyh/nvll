import { JSX } from 'preact/jsx-runtime'
import { anchorRel, anchorTarget } from '../helpers/var/attributes.ts'

type CopyrightProps = {
	bottom?: boolean
	currentYear?: number
}

export default function Copyright({ bottom, currentYear }: CopyrightProps): JSX.Element {
	const licenseUrl: Readonly<string> = 'https://raw.githubusercontent.com/rvnrstnsyh/nvll/refs/heads/main/LICENSE'

	return (
		<nav className={`copyright ${bottom ? 'my-[16px]' : 'my-[17px]'}`}>
			<div className='wrapper'>
				{currentYear && (
					<p>
						© {currentYear || '2025'} Non-Violable Liberty Layers<br />
						Licensed under <a className='anchor-text' href={licenseUrl} rel={anchorRel} target={anchorTarget}>CC BY-NC-SA 4.0</a>
					</p>
				)}
				<ul>
					<li></li>
				</ul>
			</div>
		</nav>
	)
}
