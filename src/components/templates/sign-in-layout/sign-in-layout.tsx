import type { ReactNode } from 'react'

import { SignInCard } from '@/components/organisms/sign-in-card'

import { signInLayoutStyles } from './sign-in-layout.styles'

import type { SignInLayoutProps } from './sign-in-layout.types'

export function SignInLayout({ showSuccess, onSubmit, className, ...props }: SignInLayoutProps): ReactNode {
  return (
    <div nvll-ui="sign-in-layout" className={signInLayoutStyles({ className })} {...props}>
      <div className="overlay" />
      <SignInCard showSuccess={showSuccess} onSubmit={onSubmit} />
    </div>
  )
}
