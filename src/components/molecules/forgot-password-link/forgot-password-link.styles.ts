import { cva } from 'class-variance-authority'

import { apply } from '@/helpers/tailwind'

export const linkWrapperStyles = cva(
  apply(`
    -mt-2 flex items-center flex-wrap justify-end
    max-[480px]:flex-col max-[480px]:items-start
  `)
)

export const forgotPasswordLinkStyles = cva(
  apply(`
    no-underline font-semibold cursor-pointer z-10
    transition-all duration-200
    text-[10px] sm:text-xs
    text-black dark:text-white
    hover:underline
  `)
)
