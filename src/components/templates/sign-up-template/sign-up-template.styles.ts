import { cva } from 'class-variance-authority'

import { apply } from '@/helpers/tailwind'

export const signUpTemplateStyles = cva(
  apply(`
    w-screen min-h-screen grid place-items-center relative
    bg-[#FFFFFF] dark:bg-[#101828]
  `)
)
