import type { HTMLAttributes, ReactNode } from 'react'

import type { heroDescriptionStyles } from './hero-description.styles'

import type { VariantProps } from 'class-variance-authority'

export interface HeroDescriptionProps extends HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof heroDescriptionStyles> {
  children?: ReactNode | string
  className?: string
}
