import type { HTMLAttributes } from 'react'

import type { homeInfoStyles } from './home-info.styles'

import type { VariantProps } from 'class-variance-authority'

export interface HomeInfoProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof homeInfoStyles> {
  epochValue?: string
  showClock?: boolean
}
