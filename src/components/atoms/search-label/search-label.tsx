import type { ReactNode } from 'react'

import { searchLabelStyles } from './search-label.styles'

import type { SearchLabelProps } from './search-label.types'

export const SearchLabel = ({ className, children, ...props }: SearchLabelProps): ReactNode => {
  return (
    <label className={searchLabelStyles({ className })} {...props}>
      {children}
    </label>
  )
}
