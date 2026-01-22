import type { HTMLAttributes, FormEvent } from 'react'

import type { signUpLayoutStyles } from './sign-up-layout.styles'

import type { VariantProps } from 'class-variance-authority'

export interface SignUpLayoutProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSubmit'>, VariantProps<typeof signUpLayoutStyles> {
  showSuccess?: boolean
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void | Promise<void>
}
