import type { ReactNode } from 'react'

import Link from 'next/link'

import { signInHeaderStyles, headerTitleStyles, headerDescriptionStyles } from './sign-in-header.styles'

import type { SignInHeaderProps } from './sign-in-header.types'

export function SignInHeader({ title = 'NVLL | Sign In', description = 'Enter your credentials', href = '/', className, ...props }: SignInHeaderProps): ReactNode {
  return (
    <div nvll-ui="sign-in-header" className={signInHeaderStyles({ className })} {...props}>
      <Link href={href}>
        <h2 className={headerTitleStyles()}>{title}</h2>
        <p className={headerDescriptionStyles()}>{description}</p>
      </Link>
    </div>
  )
}
