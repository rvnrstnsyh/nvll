import type { ReactNode } from 'react'

import { Divider } from '@/components/atoms/divider'

import { SignInLink } from '@/components/molecules/sign-in-link'
import { SignUpHeader } from '@/components/molecules/sign-up-header'
import { SuccessMessage } from '@/components/molecules/success-message'

import { SignUpForm } from '@/components/organisms/sign-up-form'

import { signUpCardStyles } from './sign-up-card.styles'

import type { SignUpCardProps } from './sign-up-card.types'

export function SignUpCard({ showSuccess, onSubmit, className, ...props }: SignUpCardProps): ReactNode {
  return (
    <div nvll-ui="sign-up-card" className={signUpCardStyles({ className })} {...props}>
      <SignUpHeader />
      <SignUpForm onSubmit={onSubmit} />
      <Divider text="Already registered?" />
      <SignInLink />
      <SuccessMessage show={showSuccess} />
    </div>
  )
}
