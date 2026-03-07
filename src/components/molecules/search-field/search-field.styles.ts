import { cva } from 'class-variance-authority'

import { apply } from '@/helpers/tailwind'

export const searchFieldStyles = cva(
  apply(`
    w-full
  `)
)

export const searchFieldInnerStyles = cva(
  apply(`
    relative w-full min-w-0 overflow-hidden transition-all duration-200
    border-2
    border-[#000000] dark:border-[#FFFFFF]
    bg-[#FFFFFF] dark:bg-[#364153]
    focus-within:-translate-x-0.5 focus-within:-translate-y-0.5
    focus-within:shadow-[4px_4px_0_#000000] dark:focus-within:shadow-[4px_4px_0_#FFFFFF]
    max-[480px]:focus-within:shadow-[3px_3px_0_#000000] max-[480px]:dark:focus-within:shadow-[3px_3px_0_#FFFFFF]
    max-[480px]:focus-within:-translate-x-px max-[480px]:focus-within:-translate-y-px
  `)
)
