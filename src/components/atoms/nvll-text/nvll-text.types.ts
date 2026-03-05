import type { CSSProperties, HTMLAttributes } from 'react'

import type { nvllTextStyles } from './nvll-text.styles'

import type { VariantProps } from 'class-variance-authority'

export interface NvllTextProps extends Omit<HTMLAttributes<HTMLHeadingElement>, 'children'>, VariantProps<typeof nvllTextStyles> {
  text?: string
  position?: 'top' | 'bottom' | null | undefined
  style?: CSSProperties | undefined
  className?: string
}
