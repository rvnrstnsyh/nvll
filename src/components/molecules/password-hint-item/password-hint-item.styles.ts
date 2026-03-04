import { cva } from 'class-variance-authority'

import { apply } from '@/helpers/tailwind'

export const passwordHintItemStyles = cva(apply('flex items-center gap-x-1 text-[9px] sm:text-[10px]'), {
  variants: {
    satisfied: {
      true: apply('text-teal-500'),
      false: apply('text-gray-500 dark:text-gray-400')
    }
  },
  defaultVariants: {
    satisfied: false
  }
})
