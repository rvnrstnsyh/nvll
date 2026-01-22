import type { ReactNode } from 'react'

import { errorMessageStyles } from './error-message.styles'

import type { ErrorMessageProps } from './error-message.types'

export function ErrorMessage({ show, children, className, ...props }: ErrorMessageProps): ReactNode {
  return (
    <span nvll-ui="error-message" className={errorMessageStyles({ show, className })} {...props}>
      {children}
    </span>
  )
}
