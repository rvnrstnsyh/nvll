import type { ReactNode } from 'react'

import { NvllText } from '@/components/atoms/nvll-text'

import { nvllDisplayWrapperStyles, nvllDisplayContainerStyles } from './nvll-display.styles'

import type { NvllDisplayProps } from './nvll-display.types'

export function NvllDisplay({ text = 'NVLL', topText, bottomText, className, ...props }: NvllDisplayProps): ReactNode {
  return (
    <div nvll-ui="nvll-display" className={nvllDisplayWrapperStyles({ className })} {...props}>
      <div className={nvllDisplayContainerStyles()}>
        <NvllText text={topText || text} position="top" />
        <NvllText text={bottomText || text} position="bottom" />
      </div>
    </div>
  )
}
