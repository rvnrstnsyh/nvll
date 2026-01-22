import type { HTMLAttributes } from 'react'

import type { greenwichClockStyles } from './greenwich-clock.styles'

import type { VariantProps } from 'class-variance-authority'

export interface GreenwichClockProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'onTimeUpdate'>, VariantProps<typeof greenwichClockStyles> {
  variant?: 'default' | 'dim' | 'muted' | null | undefined
  size?: 'sm' | 'md' | 'lg' | null | undefined
  showLabel?: boolean
  label?: string
  updateInterval?: number
  onTimeChange?: (time: string) => void
}
