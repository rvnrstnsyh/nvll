import type { HTMLAttributes } from 'react'

import type { signUpFeatureStyles } from './sign-up-feature.styles'

import type { VariantProps } from 'class-variance-authority'

export interface SignUpFeatureProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof signUpFeatureStyles> {
  className?: string
}
