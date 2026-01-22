import type { HTMLAttributes, FormEvent } from 'react'

import type { signInLayoutStyles } from './sign-in-layout.styles'

import type { VariantProps } from 'class-variance-authority'

export interface SignInLayoutProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSubmit'>, VariantProps<typeof signInLayoutStyles> {
  showSuccess?: boolean
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void | Promise<void>
}
