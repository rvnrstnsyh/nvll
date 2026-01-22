import { cva } from 'class-variance-authority'

import { apply } from '@/helpers/tailwind'

export const successMessageStyles = cva(
  apply(`
    hidden text-center opacity-0 translate-y-4
    transition-all duration-300
    py-6 sm:py-8 px-4 sm:px-5
  `),
  {
    variants: {
      show: {
        true: apply(`block opacity-100 translate-y-0`),
        false: ''
      }
    },
    defaultVariants: {
      show: false
    }
  }
)

export const successIconStyles = cva(
  apply(`
    flex items-center justify-center mx-auto
    font-black
    w-10 h-10 sm:w-12 sm:h-12
    mb-3 sm:mb-4
    text-lg sm:text-xl
    border-2
    bg-black dark:bg-white
    text-white dark:text-black
    border-black dark:border-white
    animate-[successPop_0.5s_ease-out]
  `)
)

export const successTitleStyles = cva(
  apply(`
    font-bold uppercase tracking-wide mb-1
    text-lg sm:text-xl
    text-black dark:text-white
  `)
)

export const successTextStyles = cva(
  apply(`
    font-bold uppercase tracking-[0.5px] leading-relaxed
    text-[10px] sm:text-xs
    text-[#666666] dark:text-gray-400
  `)
)
