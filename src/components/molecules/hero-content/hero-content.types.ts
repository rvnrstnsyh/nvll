import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

import type { heroContentWrapperStyles } from './hero-content.styles'

import type { VariantProps } from 'class-variance-authority'

export interface HeroContentProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof heroContentWrapperStyles> {
  description?: ReactNode
  children?: ReactNode
  animationDelay?: string
  style?: CSSProperties | undefined
  className?: string
}
