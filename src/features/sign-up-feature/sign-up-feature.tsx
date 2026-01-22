'use client'

import { useState } from 'react'

import type { ReactNode, FormEvent } from 'react'

import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import { useRouter } from 'next/navigation'

import { InvitationLayout } from '@/components/templates/invitation-layout'
import { SignUpLayout } from '@/components/templates/sign-up-layout'

import { signUpFeatureStyles } from './sign-up-feature.styles'

import type { SignUpFeatureProps } from './sign-up-feature.types'

// Helper function to check initial step
function getInitialStep(): 'invitation' | 'registration' {
  if (typeof window === 'undefined') return 'invitation'

  const storedCode: string | null = sessionStorage.getItem('invitationCode')
  const termsAccepted: string | null = sessionStorage.getItem('termsAccepted')

  return storedCode && termsAccepted === 'true' ? 'registration' : 'invitation'
}

// Helper function to get initial code
function getInitialCode(): string | null {
  if (typeof window === 'undefined') return null

  const storedCode: string | null = sessionStorage.getItem('invitationCode')
  const termsAccepted: string | null = sessionStorage.getItem('termsAccepted')

  return storedCode && termsAccepted === 'true' ? storedCode : null
}

export function SignUpFeature({ className, ...props }: SignUpFeatureProps): ReactNode {
  const router: AppRouterInstance = useRouter()
  const [step, setStep] = useState<'invitation' | 'registration'>(getInitialStep)
  const [showSuccess, setShowSuccess] = useState<boolean>(false)
  const [_invitationCode, setInvitationCode] = useState<string | null>(getInitialCode)

  const handleValidCode = (code: string): void => {
    setInvitationCode(code)
    setStep('registration')
  }

  const handleSignUpSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    const formData: FormData = new FormData(event.currentTarget)
    const _email: FormDataEntryValue | null = formData.get('email')
    const _username: FormDataEntryValue | null = formData.get('username')
    const password: FormDataEntryValue | null = formData.get('password')
    const confirmPassword: FormDataEntryValue | null = formData.get('confirmPassword')
    const terms: FormDataEntryValue | null = formData.get('terms')

    // Validate passwords match
    if (password !== confirmPassword) {
      // Handle error
      return
    }
    if (!terms) {
      // Handle error
      return
    }
    // Simulate API call with invitation code
    await new Promise((resolve): NodeJS.Timeout => setTimeout(resolve, 1000))
    // Clear session storage
    sessionStorage.removeItem('invitationCode')
    sessionStorage.removeItem('termsAccepted')
    // Show success
    setShowSuccess(true)
    // Redirect to sign in
    setTimeout(() => {
      router.push('/sign-in')
    }, 2000)
  }

  return (
    <main data-ui="sign-up-feature" className={signUpFeatureStyles({ className })} {...props}>
      {step === 'invitation' ? <InvitationLayout onValidCode={handleValidCode} /> : <SignUpLayout showSuccess={showSuccess} onSubmit={handleSignUpSubmit} />}
    </main>
  )
}
