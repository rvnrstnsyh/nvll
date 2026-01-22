import type { HTMLAttributes, ReactNode } from 'react'

import type { homeHeroSectionStyles } from './home-hero.styles'

import type { VariantProps } from 'class-variance-authority'

export interface HomeHeroProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof homeHeroSectionStyles> {
  description?: ReactNode
  nvllText?: string
  showNvll?: boolean
}
