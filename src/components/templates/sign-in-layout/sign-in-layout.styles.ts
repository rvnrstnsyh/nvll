import { cva } from 'class-variance-authority'

import { apply } from '@/helpers/tailwind'

export const signInLayoutStyles = cva(
  apply(`
    w-screen min-h-screen grid place-items-center relative
    bg-white dark:bg-gray-900
  `)
)
