import { cva } from 'class-variance-authority'

import { apply } from '@/helpers/tailwind'

export const greenwichClockStyles = cva(
  apply(`
    tabular-nums
    transition-opacity duration-200
  `),
  {
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
      },
      loading: {
        true: apply(`opacity-50`),
        false: apply(`opacity-100`)
      }
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
      loading: false
    }
  }
)

export const clockTimeStyles = cva(apply(`font-medium`))

export const clockLabelStyles = cva(apply(`font-normal ml-1`))
