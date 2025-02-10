import { JSX } from 'preact/jsx-runtime'

interface NavigationProps {
	currentYear?: number
}

export default function Navigation({ currentYear }: NavigationProps): JSX.Element {
	return (
		<nav className='navigation'>
			<div className='wrapper'>
				<div>
					{currentYear && <p className='copyright'>© {currentYear || '2025'} Non-Violable Liberty Layers.</p>}
				</div>
				<ul>
					<li>
						[<a href='https://etherscan.io/address/0x0000047189d70937321EEc75E5F222A0F4000094'>Support</a>]
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
