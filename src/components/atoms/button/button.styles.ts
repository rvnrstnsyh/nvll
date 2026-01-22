import { cva } from 'class-variance-authority'

import { apply } from '@/helpers/tailwind'

export const buttonStyles = cva(
  apply(`
    inline-flex items-center justify-center font-semibold uppercase tracking-wide
    cursor-pointer transition-all duration-200 border-2 relative overflow-hidden
  `),
  {
    variants: {
      variant: {
        primary: apply(`
          bg-black dark:bg-white
          text-white dark:text-black
          border-black dark:border-white
        `),
        outlinePrimary: apply(`
          bg-transparent
          text-black dark:text-white
          border-black dark:border-white
        `)
      },
      size: {
        sm: apply(`
          px-2 py-0.5 sm:px-2.5 sm:py-1
          text-xs sm:text-xs
        `),
        md: apply(`
          px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-3.5 md:py-1.5
          text-xs sm:text-sm md:text-sm lg:text-base
        `),
        lg: apply(`
          px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5
          text-sm sm:text-base md:text-base lg:text-lg
        `),
        xl: apply(`
          px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3
          text-base sm:text-lg md:text-lg lg:text-xl
        `),
        form: apply(`
          py-2.5
          text-xs sm:text-sm
        `)
      },
      fullWidth: {
        true: apply(`w-full`),
        false: ''
      },
      state: {
        idle: '',
        hover: apply(`
          hover:-translate-x-0.5 hover:-translate-y-0.5
          hover:shadow-[4px_4px_0_#000000] dark:hover:shadow-[4px_4px_0_#ffffff]
        `),
        active: apply(`
          active:translate-x-0 active:translate-y-0
          active:shadow-[2px_2px_0_#000000] dark:active:shadow-[2px_2px_0_#ffffff]
        `)
      },
      processing: {
        true: 'pointer-events-none',
        false: ''
      }
    },
    compoundVariants: [
      {
        variant: 'primary',
        state: 'hover',
        class: apply(`hover:bg-[#333333] dark:hover:bg-gray-200`)
      }
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
      state: 'idle',
      processing: false
    }
  }
)

export const buttonTextStyles = cva(apply(`relative z-10 transition-opacity duration-200`), {
  variants: {
    processing: {
      true: 'opacity-0',
      false: 'opacity-100'
    }
  },
  defaultVariants: {
    processing: false
  }
})

export const buttonLoaderStyles = cva(
  apply(`
    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
    flex gap-0.75 transition-opacity duration-200
  `),
  {
    variants: {
      processing: {
        true: 'opacity-100',
        false: 'opacity-0'
      }
    },
    defaultVariants: {
      processing: false
    }
  }
)

export const loaderBarStyles = cva(
  apply(`
    w-[2.5px] h-3 sm:w-0.75 sm:h-4
    bg-white dark:bg-black
    animate-[loaderPulse_1s_ease-in-out_infinite]
  `)
)
