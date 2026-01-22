import { cva } from 'class-variance-authority'

import { apply } from '@/helpers/tailwind'

export const signUpCardStyles = cva(
  apply(`
    relative z-10 rounded-none transition-all duration-200
    max-w-100 w-full mx-4 sm:mx-auto
    p-6 sm:p-8 md:p-10
    border-[3px]
    bg-white dark:bg-gray-800
    border-black dark:border-white
    shadow-[6px_6px_0_#000000] dark:shadow-[6px_6px_0_#ffffff]
    sm:shadow-[8px_8px_0_#000000] sm:dark:shadow-[8px_8px_0_#ffffff]
    max-[480px]:border-2
    max-[360px]:p-5 max-[360px]:mx-2
    max-[360px]:shadow-[4px_4px_0_#000000] max-[360px]:dark:shadow-[4px_4px_0_#ffffff]
    max-h-[600px]:landscape:py-4 max-h-[600px]:landscape:my-4
  `)
)
