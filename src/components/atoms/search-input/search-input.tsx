import { forwardRef } from 'react'

import type { ReactNode } from 'react'

import { searchInputStyles } from './search-input.styles'

import type { SearchInputProps } from './search-input.types'

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(({ className, ...props }, ref): ReactNode => {
  return <input nvll-ui="search-input" className={searchInputStyles({ className })} type="search" ref={ref} {...props} />
})

SearchInput.displayName = 'SearchInput'
