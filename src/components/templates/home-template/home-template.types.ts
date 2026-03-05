import type { HTMLAttributes, ReactNode } from 'react'

import type { homeTemplateStyles } from './home-template.styles'

import type { VariantProps } from 'class-variance-authority'

export interface HomeTemplateProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof homeTemplateStyles> {
  epochValue?: string
  showClock?: boolean
  description?: ReactNode
  nvllText?: string
  showNvll?: boolean
  className?: string
}
