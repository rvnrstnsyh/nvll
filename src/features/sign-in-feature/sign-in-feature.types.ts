import type { HTMLAttributes } from 'react'

import type { signInFeatureStyles } from './sign-in-feature.styles'

import type { VariantProps } from 'class-variance-authority'

export interface SignInFeatureProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof signInFeatureStyles> {}
