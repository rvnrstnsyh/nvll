import type { ReactNode } from 'react'

import { HomeCTA } from '@/components/molecules/home-cta'
import { HomeInfo } from '@/components/molecules/home-info'

import { navbarStyles, navbarContainerStyles, navbarContentStyles } from './navbar.styles'

import type { NavbarProps } from './navbar.types'

export function Navbar({ epochValue, showClock = true, className, ...props }: NavbarProps): ReactNode {
  return (
    <header nvll-ui="navbar" className={navbarStyles({ className })} {...props}>
      <div className={navbarContainerStyles()}>
        <div className={navbarContentStyles()}>
          <HomeInfo epochValue={epochValue} showClock={showClock} />
          <HomeCTA />
        </div>
      </div>
    </header>
  )
}
