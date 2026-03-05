import { cva } from 'class-variance-authority'

import { apply } from '@/helpers/tailwind'

export const checkboxFieldStyles = cva(apply(`mt-[0.5px] flex items-start justify-start cursor-pointer`))

export const checkboxLabelStyles = cva(
  apply(`
    flex items-center cursor-pointer select-none font-semibold
    gap-1.5 sm:gap-2
    text-[10px] sm:text-xs
    text-[#000000] dark:text-[#FFFFFF]
  `)
)

export const checkboxBoxStyles = cva(
  apply(`
    relative shrink-0 transition-all duration-200
    w-3.5 h-3.5 sm:w-4 sm:h-4
    border-2 border-[#000000] dark:border-[#FFFFFF]
    bg-[#FFFFFF] dark:bg-[#364153]
    after:absolute after:top-1/2 after:left-1/2
    after:-translate-x-1/2 after:-translate-y-1/2
    after:font-[#000000] after:opacity-0 after:transition-opacity after:duration-200
    after:text-[8px] sm:after:text-[10px]
    after:text-[#FFFFFF] dark:after:text-[#000000]
    after:content-['✓']
    [input:checked+label_&]:bg-[#000000] [input:checked+label_&]:dark:bg-[#FFFFFF]
    [input:checked+label_&]:after:opacity-100
  `)
)

export const checkboxTextStyles = cva(apply(`mt-2 sm:mt-3 leading-3.5 sm:leading-3.75`))

export const checkboxSubtextStyles = cva(
  apply(`
    text-[9px] sm:text-[10px]
    text-[#6A7282] dark:text-[#99A1AF]
  `)
)
