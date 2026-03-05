import type { HTMLAttributes, ReactNode } from 'react'

import type { errorMessageStyles } from './error-message.styles'

import type { VariantProps } from 'class-variance-authority'

export interface ErrorMessageProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof errorMessageStyles> {
  show?: boolean
  children?: ReactNode
  className?: string
}
