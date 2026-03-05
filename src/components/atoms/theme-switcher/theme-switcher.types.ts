import type { ButtonHTMLAttributes } from 'react'

import type { themeSwitcherStyles } from './theme-switcher.styles'

import type { VariantProps } from 'class-variance-authority'

export interface ThemeSwitcherProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof themeSwitcherStyles> {
  size?: 'sm' | 'md' | 'lg' | null | undefined
  onThemeChange?: (isDark: boolean) => void
  className?: string
}
