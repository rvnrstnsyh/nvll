import { cva } from 'class-variance-authority'

import { apply } from '@/helpers/tailwind'

export const formGroupStyles = cva(apply(`relative mb-4`), {
  variants: {
    error: {
      true: 'error',
      false: ''
    }
  }
})
