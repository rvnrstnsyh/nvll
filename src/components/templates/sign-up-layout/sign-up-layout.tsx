import type { ReactNode } from 'react'

import { SignUpCard } from '@/components/organisms/sign-up-card'

import { signUpLayoutStyles } from './sign-up-layout.styles'

import type { SignUpLayoutProps } from './sign-up-layout.types'

export function SignUpLayout({ showSuccess, onSubmit, className, ...props }: SignUpLayoutProps): ReactNode {
  return (
    <div nvll-ui="sign-up-layout" className={signUpLayoutStyles({ className })} {...props}>
      <div className="overlay" />
      <SignUpCard showSuccess={showSuccess} onSubmit={onSubmit} />
    </div>
  )
}
