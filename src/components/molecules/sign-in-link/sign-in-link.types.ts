import type { HTMLAttributes } from 'react'

import type { signInLinkWrapperStyles } from './sign-in-link.styles'

import type { VariantProps } from 'class-variance-authority'

export interface SignInLinkProps extends HTMLAttributes<HTMLAnchorElement>, VariantProps<typeof signInLinkWrapperStyles> {
  href?: string
  text?: string
}
