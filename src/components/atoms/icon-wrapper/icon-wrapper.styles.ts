import { cva } from 'class-variance-authority'

import { apply } from '@/helpers/tailwind'

export const iconWrapperStyles = cva(apply('absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none'))
