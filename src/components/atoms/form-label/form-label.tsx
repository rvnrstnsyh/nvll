import type { ReactNode } from 'react'

import { formLabelStyles } from './form-label.styles'

import type { FormLabelProps } from './form-label.types'

export function FormLabel({ htmlFor, children, className, ...props }: FormLabelProps): ReactNode {
  return (
    <label nvll-ui="form-label" htmlFor={htmlFor} className={formLabelStyles({ className })} {...props}>
      {children}
    </label>
  )
}
