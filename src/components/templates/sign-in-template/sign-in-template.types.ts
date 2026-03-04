import type { HTMLAttributes, FormEvent } from 'react'

import type { signInTemplateStyles } from './sign-in-template.styles'

import type { VariantProps } from 'class-variance-authority'

export interface SignInTemplateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSubmit'>, VariantProps<typeof signInTemplateStyles> {
  showSuccess?: boolean
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void | Promise<void>
}
