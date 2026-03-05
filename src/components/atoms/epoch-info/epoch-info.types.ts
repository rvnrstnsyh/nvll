import type { HTMLAttributes } from 'react'

import type { epochInfoStyles } from './epoch-info.styles'

import type { VariantProps } from 'class-variance-authority'

export interface EpochInfoProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof epochInfoStyles> {
  size?: 'sm' | 'md' | 'lg' | null | undefined
  value?: string
  className?: string
}
