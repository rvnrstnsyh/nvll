import type { ReactNode } from 'react'

import { HomeHero } from '@/components/organisms/home-hero'
import { Navbar } from '@/components/organisms/navbar'

import { homeTemplateStyles, homeTemplateContainerStyles } from './home-template.styles'

import type { HomeTemplateProps } from './home-template.types'

export function HomeTemplate({ epochValue, showClock = true, description, nvllText = 'NVLL', showNvll = true, className, ...props }: HomeTemplateProps): ReactNode {
  return (
    <div nvll-ui="home-template" className={homeTemplateStyles({ className })} {...props}>
      <div className={homeTemplateContainerStyles()}>
        <Navbar epochValue={epochValue} showClock={showClock} />
        <HomeHero description={description} nvllText={nvllText} showNvll={showNvll} />
      </div>
    </div>
  )
}
