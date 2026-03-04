'use client'

import { useState } from 'react'

import type { ChangeEvent, ReactNode } from 'react'

import { ErrorMessage } from '@/components/atoms/error-message'
import { FormInput } from '@/components/atoms/form-input'
import { FormLabel } from '@/components/atoms/form-label'

import { PasswordHintList } from '@/components/molecules/password-hint-list'

import { passwordFieldStyles, passwordToggleStyles, passwordInputStyles, passwordWrapperStyles, passwordInputWrapperStyles } from './password-field.styles'

import type { PasswordFieldProps } from './password-field.types'

export function PasswordField({ label = 'Password', error, errorMessage, inputProps, strengthHint, className, ...props }: PasswordFieldProps): ReactNode {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [passwordValue, setPasswordValue] = useState<string>('')

  const inputId: string = inputProps?.id ?? 'sign-up-password-field-input'

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.target.value)
    inputProps?.onChange?.(event)
  }

  return (
    <div nvll-ui="password-field" className={passwordFieldStyles({ error: !!error, className })} {...props}>
      {label && <FormLabel htmlFor={inputId}>{label}</FormLabel>}
      <div className={passwordWrapperStyles()}>
        <FormInput
          id={inputId}
          type={showPassword ? 'text' : 'password'}
          error={!!error}
          wrapperClassName={passwordInputWrapperStyles()}
          className={passwordInputStyles()}
          {...inputProps}
          onChange={handleChange}
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)} className={passwordToggleStyles()} aria-label="Toggle password visibility">
          <span className="toggle-text">{showPassword ? 'HIDE' : 'SHOW'}</span>
        </button>
      </div>
      <ErrorMessage show={!!error}>{errorMessage}</ErrorMessage>
      {strengthHint && <PasswordHintList password={passwordValue} />}
    </div>
  )
}
