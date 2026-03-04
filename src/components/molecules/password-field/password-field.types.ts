import type { HTMLAttributes, ReactNode } from 'react'

import type { FormInputProps } from '@/components/atoms/form-input'

import type { passwordFieldStyles } from './password-field.styles'

import type { VariantProps } from 'class-variance-authority'

export interface PasswordFieldProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof passwordFieldStyles> {
  label?: ReactNode
  error?: boolean
  errorMessage?: ReactNode
  inputProps?: FormInputProps
  strengthHint?: boolean
}
