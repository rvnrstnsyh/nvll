import { cva } from 'class-variance-authority'

import { apply } from '@/helpers/tailwind'

export const passwordHintItemStyles = cva(apply('flex items-center gap-x-1 text-[9px] sm:text-[10px]'), {
  variants: {
    satisfied: {
      true: apply('text-[#00BBA7]'),
      false: apply('text-[#6A7282] dark:text-[#99A1AF]')
    }
  },
  defaultVariants: {
    satisfied: false
  }
})
