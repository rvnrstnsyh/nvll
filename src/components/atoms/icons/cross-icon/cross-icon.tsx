import type { ReactNode } from 'react'

import { crossIconStyles } from './cross-icon.styles'

import type { CrossIconProps } from './cross-icon.types'

export const CrossIcon = ({ className, ...props }: CrossIconProps): ReactNode => {
  return (
    <svg
      nvll-ui="cross-icon"
      className={crossIconStyles({ className })}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
