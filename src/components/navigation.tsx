import { JSX } from 'preact/jsx-runtime'

interface NavigationProps {
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
						[<a href='asc/publickey.asc'>PGP</a>]
					</li>
				</ul>
			</div>
		</nav>
	)
}
