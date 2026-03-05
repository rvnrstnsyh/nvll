'use client'

import { useState } from 'react'

import type { ReactNode, SubmitEvent } from 'react'

import { Button } from '@/components/atoms/button'

import { CheckboxField } from '@/components/molecules/checkbox-field'
import { ForgotPasswordLink } from '@/components/molecules/forgot-password-link'
import { FormGroup } from '@/components/molecules/form-group'
import { PasswordField } from '@/components/molecules/password-field'
import { SecurityNotice } from '@/components/molecules/security-notice'

import { signInFormStyles } from './sign-in-form.styles'

import type { SignInFormProps } from './sign-in-form.types'

export function SignInForm({ onSubmit, className, ...props }: SignInFormProps): ReactNode {
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [errors, _setErrors] = useState<Record<string, string>>({ email: '', password: '' })

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsProcessing(true)

    try {
      await onSubmit?.(event)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <form nvll-ui="sign-in-form" onSubmit={handleSubmit} className={signInFormStyles({ className })} noValidate {...props}>
      <FormGroup label="Email or username" error={!!errors.email} errorMessage={errors.email} inputProps={{ id: 'email', name: 'email', type: 'email', required: true, autoComplete: 'email' }} />
      <PasswordField label="Password" error={!!errors.password} errorMessage={errors.password} inputProps={{ id: 'password', name: 'password', required: true, autoComplete: 'current-password' }} />
      <ForgotPasswordLink />
      <CheckboxField id="remember" name="remember" label="Keep me signed in" subtext="Recommended on trusted devices." />
      <SecurityNotice>
        It&apos;s recommended to stay signed in to your NVLL Account on trusted devices, as this ensures session persistence and enables device data recovery. By selecting the &quot;Keep me signed
        in&quot; checkbox, you avoid repeated logins and maintain access to key features. However, on untrusted or public devices, it is crucial not to use this feature and, for enhanced security, to
        use private or incognito mode to prevent sensitive data from being stored and accessed by others.
      </SecurityNotice>
      <Button text="Sign In" processing={isProcessing} type="submit" variant="primary" state="hover" fullWidth />
    </form>
  )
}
