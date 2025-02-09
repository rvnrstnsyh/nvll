import { JSX } from 'preact/jsx-runtime'

interface NavigationProps {
	copyright: boolean
	currentYear?: number
}

export default function Navigation({ copyright, currentYear }: NavigationProps): JSX.Element {
	return (
		<nav className='navigation'>
			<div className='wrapper'>
				<div>
					{copyright && <p className='copyright'>© {currentYear || '2025'} Non-Violable Liberty Layers.</p>}
				</div>
				<ul>
					<li>
						[<a href='mailto:re@nvll.me'>Contact</a>]
					</li>
					<li>
						[<a href='https://github.com/rvnrstnsyh'>GitHub</a>]
					</li>
					<li>
						[<a href='pdf/curriculum-vitae.pdf'>CV</a>]
					</li>
					<li>
						[<a href='asc/OpenPGP_0xE2FD809DB061DCA8.asc'>PGP</a>]
					</li>
				</ul>
			</div>
		</nav>
	)
}
