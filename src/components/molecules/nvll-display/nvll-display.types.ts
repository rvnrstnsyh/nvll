import type { HTMLAttributes } from 'react'

import type { nvllDisplayWrapperStyles } from './nvll-display.styles'

import type { VariantProps } from 'class-variance-authority'

export interface NvllDisplayProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof nvllDisplayWrapperStyles> {
  text?: string
  topText?: string
  bottomText?: string
  className?: string
}
