import type { FormEvent, HTMLAttributes } from 'react'

import type { signInCardStyles } from './sign-in-card.styles'

import type { VariantProps } from 'class-variance-authority'

export interface SignInCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSubmit'>, VariantProps<typeof signInCardStyles> {
  showSuccess?: boolean
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void | Promise<void>
}
