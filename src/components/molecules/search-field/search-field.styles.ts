import { cva } from 'class-variance-authority'

import { apply } from '@/helpers/tailwind'

export const searchFieldStyles = cva(apply('max-w-xl mx-auto'))

export const searchFieldInnerStyles = cva(apply('relative'))
