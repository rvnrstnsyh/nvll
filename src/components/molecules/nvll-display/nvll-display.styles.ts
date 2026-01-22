import { cva } from 'class-variance-authority'

import { apply } from '@/helpers/tailwind'

export const nvllDisplayWrapperStyles = cva(apply(`relative flex-1 flex items-end justify-start leading-none`))

export const nvllDisplayContainerStyles = cva(apply(`absolute bottom-0 flex flex-col items-start`))
