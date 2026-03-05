import type { InputHTMLAttributes } from 'react'

import type { formInputStyles } from './form-input.styles'

import type { VariantProps } from 'class-variance-authority'

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof formInputStyles> {
  error?: boolean
  wrapperClassName?: string
  className?: string
}
