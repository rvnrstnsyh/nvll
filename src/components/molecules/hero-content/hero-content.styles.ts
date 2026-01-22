import { cva } from 'class-variance-authority'

import { apply } from '@/helpers/tailwind'

export const heroContentWrapperStyles = cva(
  apply(`
    self-end opacity-0
    max-w-xl sm:max-w-152 md:max-w-171
    pt-10
    animate-[desc-fade-in_0.25s_ease-out_forwards]
    max-[640px]:pt-6 
    max-[480px]:pt-4 max-[480px]:max-w-full
    max-h-[600px]:landscape:pt-4
  `)
)
