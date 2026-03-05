import type { HTMLAttributes } from 'react'

import type { dividerStyles } from './divider.styles'

import type { VariantProps } from 'class-variance-authority'

export interface DividerProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof dividerStyles> {
  text?: string
  className?: string
}
