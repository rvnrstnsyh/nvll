import type { HTMLAttributes, FormEvent } from 'react'

import type { signUpCardStyles } from './sign-up-card.styles'

import type { VariantProps } from 'class-variance-authority'

export interface SignUpCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSubmit'>, VariantProps<typeof signUpCardStyles> {
  showSuccess?: boolean
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void | Promise<void>
}
