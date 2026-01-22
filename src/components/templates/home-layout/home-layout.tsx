import type { ReactNode } from 'react'

import { HomeHero } from '@/components/organisms/home-hero'
import { Navbar } from '@/components/organisms/navbar'

import { homeLayoutStyles, homeLayoutContainerStyles } from './home-layout.styles'

import type { HomeLayoutProps } from './home-layout.types'

export function HomeLayout({ epochValue, showClock = true, description, nvllText = 'NVLL', showNvll = true, className, ...props }: HomeLayoutProps): ReactNode {
  return (
    <div nvll-ui="home-layout" className={homeLayoutStyles({ className })} {...props}>
      <div className={homeLayoutContainerStyles()}>
        <Navbar epochValue={epochValue} showClock={showClock} />
        <HomeHero description={description} nvllText={nvllText} showNvll={showNvll} />
      </div>
    </div>
  )
}
