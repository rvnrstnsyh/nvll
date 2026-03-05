import { forwardRef } from 'react'

import type { ReactNode } from 'react'

import { searchInputStyles } from './search-input.styles'

import type { SearchInputProps } from './search-input.types'

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(({ className, ...props }, ref): ReactNode => {
  return <input type="search" ref={ref} className={searchInputStyles({ className })} {...props} />
})

SearchInput.displayName = 'SearchInput'
