import type { ReactNode } from 'react'

import { forgotPasswordLinkStyles, linkWrapperStyles } from './forgot-password-link.styles'

import type { ForgotPasswordLinkProps } from './forgot-password-link.types'

export function ForgotPasswordLink({ href = '#', children = 'Forgot password?', className, ...props }: ForgotPasswordLinkProps): ReactNode {
  return (
    <div nvll-ui="forgot-password-link" className={linkWrapperStyles()}>
      <a className={forgotPasswordLinkStyles({ className })} href={href} {...props}>
        {children}
      </a>
    </div>
  )
}
