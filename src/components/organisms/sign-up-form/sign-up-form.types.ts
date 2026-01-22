import type { FormHTMLAttributes, FormEvent } from 'react'

import type { signUpFormStyles } from './sign-up-form.styles'

import type { VariantProps } from 'class-variance-authority'

export interface SignUpFormProps extends FormHTMLAttributes<HTMLFormElement>, VariantProps<typeof signUpFormStyles> {
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void | Promise<void>
}
