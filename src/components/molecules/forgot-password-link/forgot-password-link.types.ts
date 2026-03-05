import type { AnchorHTMLAttributes, ReactNode } from 'react'

import type { forgotPasswordLinkStyles } from './forgot-password-link.styles'

import type { VariantProps } from 'class-variance-authority'

export interface ForgotPasswordLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof forgotPasswordLinkStyles> {
  href?: string
  children?: ReactNode
  className?: string
}
