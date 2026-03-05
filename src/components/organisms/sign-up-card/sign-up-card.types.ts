import type { HTMLAttributes, SubmitEvent } from 'react'

import type { signUpCardStyles } from './sign-up-card.styles'

import type { VariantProps } from 'class-variance-authority'

export interface SignUpCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSubmit'>, VariantProps<typeof signUpCardStyles> {
  showSuccess?: boolean
  onSubmit?: (event: SubmitEvent<HTMLFormElement>) => void | Promise<void>
  className?: string
}
