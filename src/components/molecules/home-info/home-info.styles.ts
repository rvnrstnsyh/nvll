import { cva } from 'class-variance-authority'

import { apply } from '@/helpers/tailwind'

export const homeInfoStyles = cva(
  apply(`
    flex flex-col sm:flex-row
    items-start sm:items-center
    gap-0.5 sm:gap-4 md:gap-6
    text-xs sm:text-sm lg:text-base
    max-[480px]:text-[10px]
    max-[360px]:text-[9px] max-[360px]:gap-1
  `)
)

export const homeInfoItemStyles = cva(apply(`block sm:mb-0`))
