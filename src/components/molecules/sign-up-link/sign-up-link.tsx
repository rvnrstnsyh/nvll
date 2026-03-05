import type { ReactNode } from 'react'

import Link from 'next/link'

import { Button } from '@/components/atoms/button'

import { signUpLinkWrapperStyles } from './sign-up-link.styles'

import type { SignUpLinkProps } from './sign-up-link.types'

export function SignUpLink({ href = '/sign-up', text = 'Sign Up', ...props }: SignUpLinkProps): ReactNode {
  return (
    <div nvll-ui="sign-up-link" className={signUpLinkWrapperStyles()}>
      <Link href={href} {...props}>
        <Button text={text} variant="outlinePrimary" state="hover" fullWidth />
      </Link>
    </div>
  )
}
