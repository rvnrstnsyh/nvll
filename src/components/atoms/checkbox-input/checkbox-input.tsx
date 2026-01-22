import { forwardRef } from 'react'

import type { ReactNode } from 'react'

import { checkboxInputStyles } from './checkbox-input.styles'

import type { CheckboxInputProps } from './checkbox-input.types'

export const CheckboxInput = forwardRef<HTMLInputElement, CheckboxInputProps>(({ className, ...props }, ref): ReactNode => {
  return <input nvll-ui="checkbox-input" ref={ref} type="checkbox" className={checkboxInputStyles({ className })} {...props} />
})

CheckboxInput.displayName = 'CheckboxInput'
