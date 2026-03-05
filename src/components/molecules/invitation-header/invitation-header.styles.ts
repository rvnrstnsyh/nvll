import { cva } from 'class-variance-authority'

import { apply } from '@/helpers/tailwind'

export const invitationHeaderStyles = cva(apply(`text-center mb-6 sm:mb-8`))

export const headerTitleStyles = cva(
  apply(`
    font-light mb-1 uppercase tracking-wide
    text-3xl md:text-[2rem]
    max-[360px]:text-lg
    text-[#000000] dark:text-[#FFFFFF]
  `)
)

export const headerDescriptionStyles = cva(
  apply(`
    text-xs sm:text-sm leading-relaxed mb-8 sm:mb-12.5
    max-[360px]:mb-6
    text-[#666666] dark:text-[#99A1AF]
  `)
)
