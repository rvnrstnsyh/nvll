import { cva } from 'class-variance-authority'

import { apply } from '@/helpers/tailwind'

export const homeInfoStyles = cva(
  apply(`
    block sm:flex
    items-start sm:items-center
    gap-0 sm:gap-4 md:gap-6
    text-xs sm:text-sm md:text-sm lg:text-base
    max-[480px]:text-[10px] 
    max-[360px]:text-[9px] max-[360px]:gap-2
  `)
)

export const homeInfoItemStyles = cva(apply(`block mb-1 sm:mb-0`))
