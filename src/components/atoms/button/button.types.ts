import type { ButtonHTMLAttributes, ReactNode } from 'react'

import type { buttonStyles } from './button.styles'

import type { VariantProps } from 'class-variance-authority'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonStyles> {
  variant?: 'primary' | 'outlinePrimary' | null | undefined
  size?: 'sm' | 'md' | 'lg' | null | undefined
  fullWidth?: boolean
  state?: 'idle' | 'hover' | 'active' | null | undefined
  text?: ReactNode
  processing?: boolean
}
