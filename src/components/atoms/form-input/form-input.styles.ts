import { cva } from 'class-variance-authority'

import { apply } from '@/helpers/tailwind'

export const inputWrapperStyles = cva(
  apply(`
    relative transition-all duration-200
    border-2
    border-black dark:border-white
    bg-white dark:bg-gray-700
    focus-within:-translate-x-0.5 focus-within:-translate-y-0.5
    focus-within:shadow-[4px_4px_0_#000000] dark:focus-within:shadow-[4px_4px_0_#ffffff]
    max-[480px]:focus-within:shadow-[3px_3px_0_#000000] max-[480px]:dark:focus-within:shadow-[3px_3px_0_#ffffff]
    max-[480px]:focus-within:-translate-x-px max-[480px]:focus-within:-translate-y-px
  `),
  {
    variants: {
      error: {
        true: apply(`
          border-[#dc3545] dark:border-[#f87171]
          animate-[shake_0.3s_ease-in-out]
        `),
        false: ''
      }
    },
    defaultVariants: {
      error: false
    }
  }
)

export const formInputStyles = cva(
  apply(`
    w-full bg-transparent border-none outline-none
    py-2 sm:py-1.75 px-3 sm:px-2.5
    text-sm font-medium
    text-black dark:text-white
    placeholder:text-[#999999] dark:placeholder:text-gray-500
  `)
)
