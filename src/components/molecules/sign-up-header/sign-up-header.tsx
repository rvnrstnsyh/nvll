import type { ReactNode } from 'react'

import Link from 'next/link'

import { signUpHeaderStyles, headerTitleStyles, headerDescriptionStyles } from './sign-up-header.styles'

import type { SignUpHeaderProps } from './sign-up-header.types'

export function SignUpHeader({ title = 'NVLL | Sign Up', description = 'Invitation only registration', href = '/', className, ...props }: SignUpHeaderProps): ReactNode {
  return (
    <div nvll-ui="sign-up-header" className={signUpHeaderStyles({ className })} {...props}>
      <Link href={href}>
        <h2 className={headerTitleStyles()}>{title}</h2>
        <p className={headerDescriptionStyles()}>{description}</p>
      </Link>
    </div>
  )
}
