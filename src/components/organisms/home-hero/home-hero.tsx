import type { ReactNode } from 'react'

import { HeroContent } from '@/components/molecules/hero-content'
import { NvllDisplay } from '@/components/molecules/nvll-display'

import { homeHeroSectionStyles, homeHeroContainerStyles } from './home-hero.styles'

import type { HomeHeroProps } from './home-hero.types'

export function HomeHero({ description, nvllText = 'NVLL', showNvll = true, className, ...props }: HomeHeroProps): ReactNode {
  return (
    <section nvll-ui="home-hero" className={homeHeroSectionStyles({ className })} {...props}>
      <div className={homeHeroContainerStyles()}>
        <HeroContent description={description} />
        {showNvll && <NvllDisplay text={nvllText} />}
      </div>
    </section>
  )
}
