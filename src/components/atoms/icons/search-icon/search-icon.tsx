import type { ReactNode } from 'react'

import { searchIconStyles } from './search-icon.styles'

import type { SearchIconProps } from './search-icon.types'

export const SearchIcon = ({ className, ...props }: SearchIconProps): ReactNode => {
  return (
    <svg nvll-ui="search-icon" className={searchIconStyles({ className })} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
    </svg>
  )
}
