import type { LabelHTMLAttributes, ReactNode } from 'react'

import type { formLabelStyles } from './form-label.styles'

import type { VariantProps } from 'class-variance-authority'

export interface FormLabelProps extends LabelHTMLAttributes<HTMLLabelElement>, VariantProps<typeof formLabelStyles> {
  htmlFor: string | undefined
  children: ReactNode
  className?: string
}
