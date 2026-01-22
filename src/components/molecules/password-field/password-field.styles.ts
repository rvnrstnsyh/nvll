import { cva } from 'class-variance-authority'

import { apply } from '@/helpers/tailwind'

export const passwordFieldStyles = cva(apply(`relative mb-4`), {
  variants: {
    error: {
      true: 'error',
      false: ''
    }
  }
})

export const passwordToggleStyles = cva(
  apply(`
    absolute right-0 top-0 bottom-0
    border-none cursor-pointer transition-all duration-200
    px-2 sm:px-3
    font-bold tracking-[0.5px]
    text-[9px] sm:text-[10px]
    bg-black dark:bg-white
    text-white dark:text-black
    active:scale-[0.98]
  `)
)

export const passwordInputStyles = cva(apply(`flex-1 pr-14 sm:pr-15`))

export const passwordWrapperStyles = cva(apply(`relative`))

export const passwordInputWrapperStyles = cva(apply(`flex items-center`))
