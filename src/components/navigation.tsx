import { JSX } from 'preact/jsx-runtime'

type NavigationProps = {
	bottom?: boolean
	currentYear?: number
}

export default function Navigation({ bottom, currentYear }: NavigationProps): JSX.Element {
	return (
		<nav className={`navigation ${bottom ? 'my-[16px]' : 'my-[17px]'}`}>
			<div className='wrapper'>
				<div>
					{currentYear && <p className='copyright'>© {currentYear || '2025'} Non-Violable Liberty Layers.</p>}
				</div>
				<ul>
					<li></li>
				</ul>
			</div>
		</nav>
	)
}
