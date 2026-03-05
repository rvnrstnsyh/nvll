import { cva } from 'class-variance-authority'

import { apply } from '@/helpers/tailwind'

export const searchInputStyles = cva(
  apply(`
    block w-md pl-10 pr-4 py-2 text-sm
    bg-white text-gray-900 border-2 border-black
    placeholder:text-gray-400
    shadow-sm
    focus:outline-none focus:ring-2
    transition-colors duration-200
    dark:bg-gray-900
    dark:text-white
    dark:border-white
    dark:placeholder:text-gray-400
  `)
)
