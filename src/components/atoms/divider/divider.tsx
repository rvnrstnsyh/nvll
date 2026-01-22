import type { ReactNode } from 'react'

import { dividerStyles, dividerTextStyles } from './divider.styles'

import type { DividerProps } from './divider.types'

export function Divider({ text = 'X', className, ...props }: DividerProps): ReactNode {
  return (
    <div nvll-ui="divider" className={dividerStyles({ className })} {...props}>
      <span className={dividerTextStyles()}>{text}</span>
    </div>
  )
}
