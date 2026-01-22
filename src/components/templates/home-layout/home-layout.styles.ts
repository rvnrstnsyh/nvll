import { cva } from 'class-variance-authority'

import { apply } from '@/helpers/tailwind'

export const homeLayoutStyles = cva(
  apply(`
    relative select-none overflow-hidden
    bg-white dark:bg-gray-900
  `)
)

export const homeLayoutContainerStyles = cva(apply(`relative z-10 h-screen flex flex-col overflow-hidden`))
