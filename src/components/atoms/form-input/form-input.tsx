import { forwardRef } from 'react'

import type { ReactNode } from 'react'

import { formInputStyles, inputWrapperStyles } from './form-input.styles'

import type { FormInputProps } from './form-input.types'

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({ error, className, wrapperClassName, ...props }, ref): ReactNode => {
  return (
    <div className={inputWrapperStyles({ error, className: wrapperClassName })}>
      <input nvll-ui="form-input" ref={ref} className={formInputStyles({ className })} {...props} />
    </div>
  )
})

FormInput.displayName = 'FormInput'
