import type { HTMLAttributes } from 'react'

import type { successMessageStyles } from './success-message.styles'

import type { VariantProps } from 'class-variance-authority'

export interface SuccessMessageProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof successMessageStyles> {
  show?: boolean
  title?: string
  message?: string
}
