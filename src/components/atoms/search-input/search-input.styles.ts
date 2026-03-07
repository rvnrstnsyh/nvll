import { cva } from 'class-variance-authority'

import { apply } from '@/helpers/tailwind'

export const searchInputStyles = cva(
  apply(`
    block w-full min-w-0 pl-9 pr-3 py-1.5 sm:py-2
    bg-transparent border-none outline-none
    text-xs sm:text-sm font-medium
    text-[#000000] dark:text-[#FFFFFF]
    placeholder:text-[#999999] dark:placeholder:text-[#6A7282]
    transition-colors duration-200
  `)
)
