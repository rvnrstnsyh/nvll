import type { ReactNode } from 'react'

import Link from 'next/link'

import { Button } from '@/components/atoms/button'

import { signInLinkWrapperStyles } from './sign-in-link.styles'

import type { SignInLinkProps } from './sign-in-link.types'

export function SignInLink({ href = '/sign-in', text = 'Sign In', ...props }: SignInLinkProps): ReactNode {
  return (
    <div className={signInLinkWrapperStyles()}>
      <Link href={href} nvll-ui="sign-in-link" {...props}>
        <Button text={text} variant="outlinePrimary" state="hover" fullWidth />
      </Link>
    </div>
  )
}
