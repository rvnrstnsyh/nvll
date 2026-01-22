import type { ReactNode } from 'react'

import { Divider } from '@/components/atoms/divider'

import { SignInHeader } from '@/components/molecules/sign-in-header'
import { SignUpLink } from '@/components/molecules/sign-up-link'
import { SuccessMessage } from '@/components/molecules/success-message'

import { SignInForm } from '@/components/organisms/sign-in-form'

import { signInCardStyles } from './sign-in-card.styles'

import type { SignInCardProps } from './sign-in-card.types'

export function SignInCard({ showSuccess, onSubmit, className, ...props }: SignInCardProps): ReactNode {
  return (
    <div nvll-ui="sign-in-card" className={signInCardStyles({ className })} {...props}>
      <SignInHeader />
      <SignInForm onSubmit={onSubmit} />
      <Divider text="Not registered yet?" />
      <SignUpLink />
      <SuccessMessage show={showSuccess} />
    </div>
  )
}
