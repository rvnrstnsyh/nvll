'use client'

import { useSyncExternalStore, useState } from 'react'

import type { ReactNode, SubmitEvent } from 'react'

import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import { useRouter } from 'next/navigation'

import { InvitationTemplate } from '@/components/templates/invitation-template'
import { SignUpTemplate } from '@/components/templates/sign-up-template'

import { signUpFeatureStyles } from './sign-up-feature.styles'

import type { SignUpFeatureProps } from './sign-up-feature.types'

function getInvitationSnapshot(): string | null {
  const storedCode: string | null = sessionStorage.getItem('invitationCode')
  const termsAccepted: string | null = sessionStorage.getItem('termsAccepted')

  return storedCode && termsAccepted === 'true' ? storedCode : null
}

function getServerSnapshot(): null {
  return null
}

export function SignUpFeature({ className, ...props }: SignUpFeatureProps): ReactNode {
  const router: AppRouterInstance = useRouter()
  const [showSuccess, setShowSuccess] = useState<boolean>(false)

  // useSyncExternalStore safely bridges SSR (serverSnapshot = null) and
  // client (reads sessionStorage) without needing setState in an effect.
  // subscribe is a no-op because sessionStorage has no push notifications —
  // step transitions are driven by explicit user actions below.
  const sessionCode: string | null = useSyncExternalStore(() => () => {}, getInvitationSnapshot, getServerSnapshot)

  // manualStep is set when the user completes the invitation form in-session.
  // It takes priority over the session-derived value so the transition is instant.
  const [manualStep, setManualStep] = useState<'invitation' | 'registration' | null>(null)

  const step: 'invitation' | 'registration' = manualStep ?? (sessionCode ? 'registration' : 'invitation')

  const handleValidCode = (_code: string): void => {
    setManualStep('registration')
  }

  const handleSignUpSubmit = async (event: SubmitEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    const formData: FormData = new FormData(event.currentTarget)
    const _email: FormDataEntryValue | null = formData.get('email')
    const password: FormDataEntryValue | null = formData.get('password')
    const confirmPassword: FormDataEntryValue | null = formData.get('confirmPassword')
    const terms: FormDataEntryValue | null = formData.get('terms')

    if (password !== confirmPassword) {
      return
    }
    if (!terms) {
      return
    }

    await new Promise((resolve): NodeJS.Timeout => setTimeout(resolve, 1000))

    sessionStorage.removeItem('invitationCode')
    sessionStorage.removeItem('termsAccepted')

    setShowSuccess(true)

    setTimeout(() => {
      router.push('/sign-in')
    }, 2000)
  }

  return (
    <main data-ui="sign-up-feature" className={signUpFeatureStyles({ className })} {...props}>
      {step === 'invitation' ? <InvitationTemplate onValidCode={handleValidCode} /> : <SignUpTemplate showSuccess={showSuccess} onSubmit={handleSignUpSubmit} />}
    </main>
  )
}
