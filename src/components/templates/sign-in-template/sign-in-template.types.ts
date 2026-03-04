import type { HTMLAttributes, SubmitEvent } from 'react'

import type { signInTemplateStyles } from './sign-in-template.styles'

import type { VariantProps } from 'class-variance-authority'

export interface SignInTemplateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSubmit'>, VariantProps<typeof signInTemplateStyles> {
  showSuccess?: boolean
  onSubmit?: (event: SubmitEvent<HTMLFormElement>) => void | Promise<void>
}
