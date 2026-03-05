import { cva } from 'class-variance-authority'

import { apply } from '@/helpers/tailwind'

export const epochInfoStyles = cva(apply(`block mb-1 sm:mb-0`), {
  variants: {
    size: {
      sm: apply(`text-xs sm:text-sm`),
      md: apply(`text-sm sm:text-base`),
      lg: apply(`text-base sm:text-lg`)
    },
    variant: {
      default: apply(`text-[#000000] dark:text-[#FFFFFF]`),
      dim: apply(`text-[#4A5565] dark:text[#99A1AF]`),
      muted: apply(`text-[#6A7282] dark:text-[#6A7282]`)
    }
  },
  defaultVariants: {
    size: 'md',
    variant: 'default'
  }
})
