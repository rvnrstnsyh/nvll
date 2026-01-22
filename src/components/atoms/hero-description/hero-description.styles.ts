import { cva } from 'class-variance-authority'

import { apply } from '@/helpers/tailwind'

export const heroDescriptionStyles = cva(
  apply(`
    text-sm sm:text-base md:text-lg
    leading-relaxed text-justify
    text-black dark:text-gray-200
    max-[480px]:text-[11px] max-[480px]:leading-relaxed 
    max-[360px]:text-[10px]
    max-h-[600px]:landscape:text-xs max-h-[600px]:landscape:leading-relaxed
  `)
)
