import type { ReactNode } from 'react'

import { successMessageStyles, successIconStyles, successTitleStyles, successTextStyles } from './success-message.styles'

import type { SuccessMessageProps } from './success-message.types'

export function SuccessMessage({ show, title = 'Success', message = 'Redirecting...', className, ...props }: SuccessMessageProps): ReactNode {
  return (
    <div nvll-ui="success-message" className={successMessageStyles({ show, className })} {...props}>
      <div className={successIconStyles()}>✓</div>
      <h3 className={successTitleStyles()}>{title}</h3>
      <p className={successTextStyles()}>{message}</p>
    </div>
  )
}
