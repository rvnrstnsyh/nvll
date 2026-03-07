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
    py-4 md:py-5
    text-[#000000] dark:text-[#FFFFFF]
    gap-y-3 gap-x-4
    max-[480px]:py-3
    max-h-[600px]:landscape:py-2
  `)
)

export const navbarInfoStyles = cva(apply(`order-1 shrink-0`))

export const navbarCtaStyles = cva(apply(`order-3 shrink-0 ml-auto`))

export const navbarSearchStyles = cva(apply(`order-2 basis-full max-w-101.75`))
