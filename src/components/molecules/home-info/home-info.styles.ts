import { cva } from 'class-variance-authority'

import { apply } from '@/helpers/tailwind'

export const homeInfoStyles = cva(
  apply(`
    flex items-start gap-4
    shrink-0 whitespace-nowrap
    text-[10px] sm:text-sm lg:text-base
    max-[360px]:text-[9px]
  `)
)

export const homeInfoItemStyles = cva(apply(`block whitespace-nowrap`))
