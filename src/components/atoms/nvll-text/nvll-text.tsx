import type { CSSProperties, ReactNode } from 'react'

import { nvllTextStyles } from './nvll-text.styles'

import type { NvllTextProps } from './nvll-text.types'

export function NvllText({ text = 'NVLL', position = 'bottom', style, className, ...props }: NvllTextProps): ReactNode {
  const maskStyle: CSSProperties | undefined =
    position === 'top'
      ? {
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)',
          ...style
        }
      : style

  return (
    <h1 nvll-ui="nvll-text" className={nvllTextStyles({ position, className })} style={maskStyle} {...props}>
      {text}
    </h1>
  )
}
