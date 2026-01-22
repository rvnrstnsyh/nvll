import { cva } from 'class-variance-authority'

import { apply } from '@/helpers/tailwind'

export const homeHeroSectionStyles = cva(apply(`flex-1 flex flex-col`))

export const homeHeroContainerStyles = cva(
  apply(`
    mx-auto w-full max-w-400 flex flex-col flex-1
    px-4 sm:px-6 md:px-12 lg:px-24
    max-[360px]:px-3
  `)
)
