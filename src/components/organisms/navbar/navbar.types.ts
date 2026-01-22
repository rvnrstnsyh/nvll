import type { HTMLAttributes } from 'react'

import type { navbarStyles } from './navbar.styles'

import type { VariantProps } from 'class-variance-authority'

export interface NavbarProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof navbarStyles> {
  epochValue?: string
  showClock?: boolean
}
