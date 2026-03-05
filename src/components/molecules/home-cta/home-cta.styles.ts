import { cva } from 'class-variance-authority'

import { apply } from '@/helpers/tailwind'

export const homeCTAStyles = cva(
  apply(`
    flex gap-2 sm:gap-3 md:gap-4 items-center
  `)
)
