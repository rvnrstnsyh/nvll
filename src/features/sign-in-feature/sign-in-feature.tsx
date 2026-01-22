'use client'

import { useState } from 'react'

import type { ReactNode, FormEvent } from 'react'

import { useRouter } from 'next/navigation'

import { SignInLayout } from '@/components/templates/sign-in-layout'

import { signInFeatureStyles } from './sign-in-feature.styles'

import type { SignInFeatureProps } from './sign-in-feature.types'

export function SignInFeature({ className, ...props }: SignInFeatureProps): ReactNode {
  const router = useRouter()
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    // Your sign-in logic here
    // const formData = new FormData(e.currentTarget)
    // const email = formData.get('email')
    // const password = formData.get('password')

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    // Show success message
    setShowSuccess(true)
    // Redirect after delay
    setTimeout((): void => {
      router.push('/dashboard')
    }, 2000)
  }

  return (
    <main nvll-ui="sign-in-feature" className={signInFeatureStyles({ className })} {...props}>
      <SignInLayout showSuccess={showSuccess} onSubmit={handleSubmit} />
    </main>
  )
}
