'use client'

import { useState } from 'react'

import type { ReactNode, FormEvent } from 'react'

import { Button } from '@/components/atoms/button'

import { CheckboxField } from '@/components/molecules/checkbox-field'
import { FormGroup } from '@/components/molecules/form-group'
import { PasswordField } from '@/components/molecules/password-field'
import { SecurityNotice } from '@/components/molecules/security-notice'

import { signUpFormStyles } from './sign-up-form.styles'

import type { SignUpFormProps } from './sign-up-form.types'

export function SignUpForm({ onSubmit, className, ...props }: SignUpFormProps): ReactNode {
  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, _setErrors] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  })

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsProcessing(true)

    try {
      await onSubmit?.(event)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <form nvll-ui="sign-up-form" className={signUpFormStyles({ className })} onSubmit={handleSubmit} noValidate {...props}>
      <FormGroup label="Email" error={!!errors.email} errorMessage={errors.email} inputProps={{ id: 'email', name: 'email', type: 'email', required: true, autoComplete: 'email' }} />
      <FormGroup label="Username" error={!!errors.username} errorMessage={errors.username} inputProps={{ id: 'username', name: 'username', type: 'text', required: true, autoComplete: 'username' }} />
      <PasswordField label="Password" error={!!errors.password} errorMessage={errors.password} inputProps={{ id: 'password', name: 'password', required: true, autoComplete: 'new-password' }} />
      <PasswordField
        label="Confirm Password"
        error={!!errors.confirmPassword}
        errorMessage={errors.confirmPassword}
        inputProps={{ id: 'confirmPassword', name: 'confirmPassword', required: true, autoComplete: 'new-password' }}
      />
      <CheckboxField id="terms" name="terms" label="I agree to the Terms and Conditions" subtext="Required to create an account." />
      <SecurityNotice>
        By creating an account, you agree to our Terms of Service and Privacy Policy. Your data will be protected and encrypted. You must be invited to register on this platform.
      </SecurityNotice>
      <Button text="Sign Up" processing={isProcessing} type="submit" variant="primary" state="hover" fullWidth />
    </form>
  )
}
