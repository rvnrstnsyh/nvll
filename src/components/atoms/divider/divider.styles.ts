import { cva } from 'class-variance-authority'

import { apply } from '@/helpers/tailwind'

export const dividerStyles = cva(
  apply(`
    text-center my-5 sm:my-6 relative
    before:absolute before:top-1/2 before:left-0 before:right-0 
    before:-translate-y-1/2 before:h-0.5
    before:bg-black dark:before:bg-white
  `)
)

export const dividerTextStyles = cva(
  apply(`
    relative z-1 font-bold uppercase tracking-wide
    px-3 sm:px-4
    text-[10px] sm:text-xs
    bg-white dark:bg-gray-800
    text-black dark:text-white
  `)
)
