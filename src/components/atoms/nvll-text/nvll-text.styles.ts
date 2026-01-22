import { cva } from 'class-variance-authority'

import { apply } from '@/helpers/tailwind'

export const nvllTextStyles = cva(
  apply(`
    font-bold
    text-[30vw] md:text-[27vw]
    text-[#00000020] dark:text-[#ffffff20]
  `),
  {
    variants: {
      position: {
        top: apply(`
          -mb-[9.5%]
          ml-[13.2%] md:ml-[19.7%] lg:ml-[12%]
          animate-[nvll-from-right_1.5s_ease-out_forwards]
        `),
        bottom: apply(`
          -mb-[5.55%]
          -ml-[4.5%] md:ml-[2%] lg:-ml-[5.7%]
          animate-[nvll-from-left_1.5s_ease-out_forwards]
        `)
      }
    },
    defaultVariants: {
      position: 'bottom'
    }
  }
)
