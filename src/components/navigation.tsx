import { JSX } from 'preact/jsx-runtime'

type NavigationProps = {
	bottom?: boolean
	currentYear?: number
}

export default function Navigation({ bottom, currentYear }: NavigationProps): JSX.Element {
	return (
		<nav className={`navigation ${bottom ? 'md:mt-1 md:-mb-[7px] my-[16px]' : 'my-[17px]'}`}>
			<div className='wrapper'>
				{currentYear && (
					<p className='copyright'>
						© {currentYear || '2025'} Non-Violable Liberty Layers<br />
						Licensed under <a className='anchor-text' href='https://raw.githubusercontent.com/rvnrstnsyh/nvll/refs/heads/main/LICENSE'>CC BY-NC-SA 4.0</a>
					</p>
				)}
				<ul>
					<li></li>
				</ul>
			</div>
		</nav>
	)
}
