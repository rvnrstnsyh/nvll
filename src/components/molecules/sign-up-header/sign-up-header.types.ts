import type { HTMLAttributes } from 'react'

import type { signUpHeaderStyles } from './sign-up-header.styles'

import type { VariantProps } from 'class-variance-authority'

export interface SignUpHeaderProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof signUpHeaderStyles> {
  title?: string
  description?: string
  href?: string
}
