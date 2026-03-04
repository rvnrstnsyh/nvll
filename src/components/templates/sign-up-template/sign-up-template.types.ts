import type { HTMLAttributes, FormEvent } from 'react'

import type { signUpTemplateStyles } from './sign-up-template.styles'

import type { VariantProps } from 'class-variance-authority'

export interface SignUpTemplateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSubmit'>, VariantProps<typeof signUpTemplateStyles> {
  showSuccess?: boolean
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void | Promise<void>
}
