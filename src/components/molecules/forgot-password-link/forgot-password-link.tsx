import type { ReactNode } from 'react'

import { forgotPasswordLinkStyles, linkWrapperStyles } from './forgot-password-link.styles'

import type { ForgotPasswordLinkProps } from './forgot-password-link.types'

export function ForgotPasswordLink({ href = '#', children = 'Forgot password?', className, ...props }: ForgotPasswordLinkProps): ReactNode {
  return (
    <div className={linkWrapperStyles()}>
      <a nvll-ui="forgot-password-link" href={href} className={forgotPasswordLinkStyles({ className })} {...props}>
        {children}
      </a>
    </div>
  )
}
