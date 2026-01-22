import { cva } from 'class-variance-authority'

import { apply } from '@/helpers/tailwind'

export const formLabelStyles = cva(
  apply(`
    block mb-2 font-bold uppercase tracking-wide
    text-[10px] sm:text-xs
    text-black dark:text-white
  `)
)
