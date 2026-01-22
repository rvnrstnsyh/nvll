import { cva } from 'class-variance-authority'

import { apply } from '@/helpers/tailwind'

export const themeSwitcherStyles = cva(
  apply(`
    relative cursor-pointer border-0 bg-transparent p-0
    focus:outline-none select-none
  `),
  {
    variants: {
      size: {
        sm: apply(`w-7 h-7`),
        md: apply(`w-9 h-9`),
        lg: apply(`w-12 h-12`)
      }
    },
    defaultVariants: {
      size: 'md'
    }
  }
)

export const sunMoonWrapperStyles = cva(
  apply(`
    relative w-full h-full rounded-full box-border overflow-hidden
    border-[2.5px] transition-colors duration-700 ease-in-out
  `),
  {
    variants: {
      theme: {
        light: apply(`bg-[#FFFFFF] border-[#101828]`),
        dark: apply(`bg-[#FFFFFF] border-[#FFFFFF]`)
      }
    },
    defaultVariants: {
      theme: 'light'
    }
  }
)

export const sunMoonBeforeStyles = cva(
  apply(`
    absolute left-1/2 top-0 h-full
    bg-[#101828]
    transition-transform duration-700 ease-in-out
    will-change-transform
  `),
  {
    variants: {
      theme: {
        light: apply(`
          w-full rounded-none
          translate-x-0 translate-y-0 rotate-0
        `),
        dark: apply(`
          w-[150%] bg-[#101828] rounded-full
          -translate-x-[5%] -translate-y-[35%] -rotate-25
        `)
      }
    },
    defaultVariants: {
      theme: 'light'
    }
  }
)

export const sunMoonAfterStyles = cva(
  apply(`
    absolute top-0 left-0 w-full h-full rounded-full
    border-[2.5px] box-border
    transition-all duration-700 ease-in-out
    pointer-events-none
  `),
  {
    variants: {
      theme: {
        light: apply(`
          border-[#FFFFFF]
          shadow-[0_0_0_0_#FFFFFF,0_0_0_2px_#101828]
        `),
        dark: apply(`
          border-[#101828]
          shadow-[0_0_0_0_#101828,0_0_0_0_#101828,0_0_0_2px_#101828]
        `)
      }
    },
    defaultVariants: {
      theme: 'light'
    }
  }
)
