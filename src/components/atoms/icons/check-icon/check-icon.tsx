import type { ReactNode } from 'react'

import { checkIconStyles } from './check-icon.styles'

import type { CheckIconProps } from './check-icon.types'

export const CheckIcon = ({ className, ...props }: CheckIconProps): ReactNode => {
  return (
    <svg
      nvll-ui="check-icon"
      className={checkIconStyles({ className })}
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
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
