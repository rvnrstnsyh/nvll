import type { ReactNode } from 'react'

import { SignInCard } from '@/components/organisms/sign-in-card'

import { signInTemplateStyles } from './sign-in-template.styles'

import type { SignInTemplateProps } from './sign-in-template.types'

export function SignInTemplate({ showSuccess, onSubmit, className, ...props }: SignInTemplateProps): ReactNode {
  return (
    <div nvll-ui="sign-in-template" className={signInTemplateStyles({ className })} {...props}>
      <div className="overlay" />
      <SignInCard showSuccess={showSuccess} onSubmit={onSubmit} />
    </div>
  )
}
