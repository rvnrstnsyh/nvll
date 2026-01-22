import type { FormHTMLAttributes, FormEvent } from 'react'

import type { signInFormStyles } from './sign-in-form.styles'

import type { VariantProps } from 'class-variance-authority'

export interface SignInFormProps extends FormHTMLAttributes<HTMLFormElement>, VariantProps<typeof signInFormStyles> {
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void | Promise<void>
}
