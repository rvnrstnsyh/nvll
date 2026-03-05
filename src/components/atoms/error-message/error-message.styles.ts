import { cva } from 'class-variance-authority'

import { apply } from '@/helpers/tailwind'

export const errorMessageStyles = cva(
  apply(`
    font-bold tracking-[0.5px]
    opacity-0 -translate-y-2 transition-all duration-200
    text-[9px] sm:text-[10px] leading-relaxed
    text-[#DC3545] dark:text-[#F87171]
  `),
  {
    variants: {
      show: {
        true: apply(`opacity-100 translate-y-0`),
        false: ''
      }
    },
    defaultVariants: {
      show: false
    }
  }
)
