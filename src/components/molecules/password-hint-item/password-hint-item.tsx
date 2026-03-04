import type { ReactNode } from 'react'

import { CheckIcon } from '@/components/atoms/icons/check-icon'
import { CrossIcon } from '@/components/atoms/icons/cross-icon'

import { passwordHintItemStyles } from './password-hint-item.styles'

import type { PasswordHintItemProps } from './password-hint-item.types'

export const PasswordHintItem = ({ satisfied, children }: PasswordHintItemProps): ReactNode => {
  return (
    <li className={passwordHintItemStyles({ satisfied })}>
      {satisfied ? <CheckIcon /> : <CrossIcon />}
      {children}
    </li>
  )
}
