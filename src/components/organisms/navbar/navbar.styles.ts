import { cva } from 'class-variance-authority'

import { apply } from '@/helpers/tailwind'

export const navbarStyles = cva(apply(`shrink-0`))

export const navbarContainerStyles = cva(
  apply(`
    mx-auto w-full max-w-400
    px-4 sm:px-6 md:px-12 lg:px-24
    max-[360px]:px-3
  `)
)

export const navbarContentStyles = cva(
  apply(`
    flex flex-wrap items-center
    pt-4 pb-3 md:pt-5 md:pb-0
    text-[#000000] dark:text-[#FFFFFF]
    gap-y-2
    max-[480px]:pt-3 max-[480px]:pb-2.5
    max-h-[600px]:landscape:pt-2 max-h-[600px]:landscape:pb-2
  `)
)

export const navbarInfoStyles = cva(
  apply(`
    order-1
    shrink-0
  `)
)

export const navbarCtaStyles = cva(
  apply(`
    order-2
    ml-auto
    shrink-0
  `)
)

export const navbarSearchStyles = cva(
  apply(`
    order-3
    w-full
    pb-1 md:pb-2
  `)
)
