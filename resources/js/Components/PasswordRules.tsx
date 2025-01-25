import Check from '@/assets/svg/Check'
import Uncheck from '@/assets/svg/Uncheck'

import { useEffect } from 'react'

interface Props {
  id: string
}

export default function PasswordRules({ id }: Props): JSX.Element {
  useEffect(() => window.HSStaticMethods.autoInit(), [])

  return (
    <div id={id} className="mb-3">
      <h4 className="my-2 text-sm font-semibold text-gray-800 dark:text-white">Your password must contain:</h4>
      <ul className="space-y-1 text-sm text-gray-500 dark:text-neutral-500">
        {[
          { text: 'Minimum number of characters is 8.', rule: 'min-length' },
          { text: 'Should contain lowercase.', rule: 'lowercase' },
          { text: 'Should contain uppercase.', rule: 'uppercase' },
          { text: 'Should contain numbers.', rule: 'numbers' },
          { text: 'Should contain special characters.', rule: 'special-characters' }
        ].map((item, index) => (
          <li
            key={index}
            data-hs-strong-password-hints-rule-text={item.rule}
            className="flex items-center gap-x-2 hs-strong-password-active:text-gray-800"
          >
            <span className="hidden" data-check="">
              <Check className="size-4 shrink-0" />
            </span>
            <span data-uncheck="">
              <Uncheck className="size-4 shrink-0" />
            </span>
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  )
}
