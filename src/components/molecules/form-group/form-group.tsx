import type { ReactNode } from 'react'

import { ErrorMessage } from '@/components/atoms/error-message'
import { FormInput } from '@/components/atoms/form-input'
import { FormLabel } from '@/components/atoms/form-label'

import { formGroupStyles } from './form-group.styles'

import type { FormGroupProps } from './form-group.types'

export function FormGroup({ label, error, errorMessage, inputProps, className, ...props }: FormGroupProps): ReactNode {
  return (
    <div nvll-ui="form-group" className={formGroupStyles({ error: !!error, className })} {...props}>
      {label && <FormLabel htmlFor={inputProps?.id}>{label}</FormLabel>}
      <FormInput error={!!error} {...inputProps} />
      <ErrorMessage show={!!error}>{errorMessage}</ErrorMessage>
    </div>
  )
}
