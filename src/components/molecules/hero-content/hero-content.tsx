import type { ReactNode } from 'react'

import { HeroDescription } from '@/components/atoms/hero-description'

import { heroContentWrapperStyles } from './hero-content.styles'

import type { HeroContentProps } from './hero-content.types'

export function HeroContent({ description, children, animationDelay = '1.6s', style, className, ...props }: HeroContentProps): ReactNode {
  return (
    <div nvll-ui="hero-content" className={heroContentWrapperStyles({ className })} style={{ animationDelay, ...style }} {...props}>
      <HeroDescription>{description || children}</HeroDescription>
    </div>
  )
}
