import { cva } from 'class-variance-authority'

import { apply } from '@/helpers/tailwind'

export const homeTemplateStyles = cva(
  apply(`
    relative select-none overflow-hidden
    bg-white dark:bg-gray-900
  `)
)

export const homeTemplateContainerStyles = cva(apply(`relative z-10 h-screen flex flex-col overflow-hidden`))
