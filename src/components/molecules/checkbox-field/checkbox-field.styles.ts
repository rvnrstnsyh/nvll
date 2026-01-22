import { cva } from 'class-variance-authority'

import { apply } from '@/helpers/tailwind'

export const checkboxFieldStyles = cva(apply(`mt-[0.5px] flex items-start justify-start cursor-pointer`))

export const checkboxLabelStyles = cva(
  apply(`
    flex items-center cursor-pointer select-none font-semibold
    gap-1.5 sm:gap-2
    text-[10px] sm:text-xs
    text-black dark:text-white
  `)
)

export const checkboxBoxStyles = cva(
  apply(`
    relative shrink-0 transition-all duration-200
    w-3.5 h-3.5 sm:w-4 sm:h-4
    border-2
    border-black dark:border-white
    bg-white dark:bg-gray-700
    after:absolute after:top-1/2 after:left-1/2
    after:-translate-x-1/2 after:-translate-y-1/2
    after:font-black after:opacity-0 after:transition-opacity after:duration-200
    after:text-[8px] sm:after:text-[10px]
    after:text-white dark:after:text-black
    after:content-['✓']
    [input:checked+label_&]:bg-black [input:checked+label_&]:dark:bg-white
    [input:checked+label_&]:after:opacity-100
  `)
)

export const checkboxTextStyles = cva(apply(`mt-2 sm:mt-3 leading-3.5 sm:leading-3.75`))

export const checkboxSubtextStyles = cva(
  apply(`
    text-[9px] sm:text-[10px]
    text-gray-500 dark:text-gray-400
  `)
)
