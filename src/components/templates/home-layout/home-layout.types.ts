import type { HTMLAttributes, ReactNode } from 'react'

import type { homeLayoutStyles } from './home-layout.styles'

import type { VariantProps } from 'class-variance-authority'

export interface HomeLayoutProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof homeLayoutStyles> {
  epochValue?: string
  showClock?: boolean
  description?: ReactNode
  nvllText?: string
  showNvll?: boolean
}
