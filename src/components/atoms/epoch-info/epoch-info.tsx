import type { ReactNode } from 'react'

import { epochInfoStyles } from './epoch-info.styles'

import type { EpochInfoProps } from './epoch-info.types'

export function EpochInfo({ size, value = '743|14.5% Epoch|Progress', className, ...props }: EpochInfoProps): ReactNode {
  return (
    <span nvll-ui="epoch-info" className={epochInfoStyles({ size, className })} {...props}>
      {value}
    </span>
  )
}
