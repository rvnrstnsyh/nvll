import { cva } from 'class-variance-authority'

import { apply } from '@/helpers/tailwind'

export const passwordHintListWrapperStyles = cva(apply('mb-3'))

export const passwordHintListTitleStyles = cva(apply('my-2 text-[10px] sm:text-xs font-semibold text-[#000000] dark:text-[#FFFFFF]'))

export const passwordHintListStyles = cva(apply('space-y-1 text-sm text-[#6A7282] dark:text-[#A1A1A1]'))
