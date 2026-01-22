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
      default: apply(`text-black dark:text-white`),
      dim: apply(`text-gray-600 dark:text-gray-400`),
      muted: apply(`text-gray-500 dark:text-gray-500`)
    }
  },
  defaultVariants: {
    size: 'md',
    variant: 'default'
  }
})
