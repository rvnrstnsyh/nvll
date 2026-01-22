'use client'

import { useState } from 'react'

import type { ReactNode } from 'react'

import { ErrorMessage } from '@/components/atoms/error-message'
import { FormInput } from '@/components/atoms/form-input'
import { FormLabel } from '@/components/atoms/form-label'

import { passwordFieldStyles, passwordToggleStyles, passwordInputStyles, passwordWrapperStyles, passwordInputWrapperStyles } from './password-field.styles'

import type { PasswordFieldProps } from './password-field.types'

export function PasswordField({ label = 'Password', error, errorMessage, inputProps, className, ...props }: PasswordFieldProps): ReactNode {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div nvll-ui="password-field" className={passwordFieldStyles({ error: !!error, className })} {...props}>
      {label && <FormLabel htmlFor={inputProps?.id}>{label}</FormLabel>}
      <div className={passwordWrapperStyles()}>
        <FormInput type={showPassword ? 'text' : 'password'} error={!!error} wrapperClassName={passwordInputWrapperStyles()} className={passwordInputStyles()} {...inputProps} />
        <button type="button" onClick={() => setShowPassword(!showPassword)} className={passwordToggleStyles()} aria-label="Toggle password visibility">
          <span className="toggle-text">{showPassword ? 'HIDE' : 'SHOW'}</span>
        </button>
      </div>
      <ErrorMessage show={!!error}>{errorMessage}</ErrorMessage>
    </div>
  )
}
