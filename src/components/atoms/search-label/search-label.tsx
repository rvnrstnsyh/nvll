import type { ReactNode } from 'react'

import { searchLabelStyles } from './search-label.styles'

import type { SearchLabelProps } from './search-label.types'

export const SearchLabel = ({ children, className, ...props }: SearchLabelProps): ReactNode => {
  return (
    <label nvll-ui="search-label" className={searchLabelStyles({ className })} {...props}>
      {children}
    </label>
  )
}
