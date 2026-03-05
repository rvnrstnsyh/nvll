import type { HTMLAttributes } from 'react'

import type { homeFeatureStyles } from './home-feature.styles'

import type { VariantProps } from 'class-variance-authority'

export interface HomeFeatureProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof homeFeatureStyles> {
  className?: string
}
