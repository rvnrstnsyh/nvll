import { cva } from 'class-variance-authority'

import { apply } from '@/helpers/tailwind'

export const securityNoticeStyles = cva(
  apply(`
    mb-5 sm:mb-6 text-justify leading-relaxed
    pl-3 sm:pl-4 pr-2 sm:pr-3 py-2 sm:py-2.5
    text-[10px]
    border-l-2
    text-gray-400 dark:text-gray-500
    border-gray-200 dark:border-gray-600
  `)
)
