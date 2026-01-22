import type { InputHTMLAttributes, ReactNode } from 'react'

import type { checkboxFieldStyles } from './checkbox-field.styles'

import type { VariantProps } from 'class-variance-authority'

export interface CheckboxFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>, VariantProps<typeof checkboxFieldStyles> {
  id?: string
  label?: ReactNode
  subtext?: ReactNode
}
