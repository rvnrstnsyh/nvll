import type { HTMLAttributes } from 'react'

import type { signInHeaderStyles } from './sign-in-header.styles'

import type { VariantProps } from 'class-variance-authority'

export interface SignInHeaderProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof signInHeaderStyles> {
  title?: string
  description?: string
  href?: string
}
