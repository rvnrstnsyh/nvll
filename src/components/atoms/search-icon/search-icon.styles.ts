import { cva } from 'class-variance-authority'

import { apply } from '@/helpers/tailwind'

export const searchIconWrapperStyles = cva(apply('absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'))

export const searchIconStyles = cva(apply('w-4 h-4 text-black dark:text-white'))
