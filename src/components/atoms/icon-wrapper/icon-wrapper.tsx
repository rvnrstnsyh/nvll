import type { ReactNode } from 'react'

import { iconWrapperStyles } from './icon-wrapper.styles'

import type { IconWrapperProps } from './icon-wrapper.types'

export const IconWrapper = ({ children, className, ...props }: IconWrapperProps): ReactNode => {
  return (
    <div nvll-ui="icon-wrapper" className={iconWrapperStyles({ className })} {...props}>
      {children}
    </div>
  )
}
