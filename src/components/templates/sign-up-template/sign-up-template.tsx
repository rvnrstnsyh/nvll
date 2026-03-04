import type { ReactNode } from 'react'

import { SignUpCard } from '@/components/organisms/sign-up-card'

import { signUpTemplateStyles } from './sign-up-template.styles'

import type { SignUpTemplateProps } from './sign-up-template.types'

export function SignUpTemplate({ showSuccess, onSubmit, className, ...props }: SignUpTemplateProps): ReactNode {
  return (
    <div nvll-ui="sign-up-Template" className={signUpTemplateStyles({ className })} {...props}>
      <div className="overlay" />
      <SignUpCard showSuccess={showSuccess} onSubmit={onSubmit} />
    </div>
  )
}
