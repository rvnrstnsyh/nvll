import type { ReactNode } from 'react'

import { PasswordHintItem } from '@/components/molecules/password-hint-item'

import { passwordHintListWrapperStyles, passwordHintListTitleStyles, passwordHintListStyles } from './password-hint-list.styles'

import type { PasswordHintListProps } from './password-hint-list.types'

const HINTS = [
  {
    label: 'Minimum number of characters is 8.',
    test: (value: string) => value.length >= 8
  },
  {
    label: 'Should contain lowercase.',
    test: (value: string) => /[a-z]/.test(value)
  },
  {
    label: 'Should contain uppercase.',
    test: (value: string) => /[A-Z]/.test(value)
  },
  {
    label: 'Should contain numbers.',
    test: (value: string) => /[0-9]/.test(value)
  },
  {
    label: 'Should contain special characters.',
    test: (value: string) => /[^a-zA-Z0-9]/.test(value)
  }
] as const

export const PasswordHintList = ({ password }: PasswordHintListProps): ReactNode => {
  return (
    <div nvll-ui="password-hint-list" className={passwordHintListWrapperStyles()}>
      <h4 className={passwordHintListTitleStyles()}>Your password requirements:</h4>
      <ul className={passwordHintListStyles()}>
        {HINTS.map(({ label, test }) => (
          <PasswordHintItem key={label} satisfied={test(password)}>
            {label}
          </PasswordHintItem>
        ))}
      </ul>
    </div>
  )
}
