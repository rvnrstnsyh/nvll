import type { HTMLAttributes } from 'react'

import type { homeCTAStyles } from './home-cta.styles'

import type { VariantProps } from 'class-variance-authority'

export interface HomeCTAProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof homeCTAStyles> {
  className?: string
}
