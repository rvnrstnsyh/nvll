import type { HTMLAttributes, ReactNode } from 'react'

import type { FormInputProps } from '@/components/atoms/form-input'

import type { formGroupStyles } from './form-group.styles'

import type { VariantProps } from 'class-variance-authority'

export interface FormGroupProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof formGroupStyles> {
  label?: ReactNode
  error?: boolean
  errorMessage?: ReactNode
  inputProps?: FormInputProps
}
