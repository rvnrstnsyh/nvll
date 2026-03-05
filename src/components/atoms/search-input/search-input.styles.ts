import { cva } from 'class-variance-authority'

import { apply } from '@/helpers/tailwind'

export const searchInputStyles = cva(
  apply(`
    block w-full pl-10 pr-4 py-2 sm:py-1.75
    bg-transparent border-none outline-none
    text-sm font-medium
    text-black dark:text-white
    placeholder:text-[#999999] dark:placeholder:text-gray-500
    transition-colors duration-200
  `)
)
