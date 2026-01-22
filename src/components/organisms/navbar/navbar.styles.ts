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
    flex items-center justify-between
    py-5 md:py-6
    text-black dark:text-white
    max-[480px]:py-4
    max-h-[600px]:landscape:py-3
  `)
)
