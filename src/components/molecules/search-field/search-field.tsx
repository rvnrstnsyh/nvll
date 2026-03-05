import type { ReactNode } from 'react'

import { IconWrapper } from '@/components/atoms/icon-wrapper'
import { SearchIcon } from '@/components/atoms/icons/search-icon'
import { SearchInput } from '@/components/atoms/search-input'
import { SearchLabel } from '@/components/atoms/search-label'

import { searchFieldStyles, searchFieldInnerStyles } from './search-field.styles'

import type { SearchFieldProps } from './search-field.types'

const LABEL_TEXT: Readonly<string> = 'Search by Address / Txn Hash / Signature Hash / Epoch'
const PLACEHOLDER_TEXT: Readonly<string> = 'Search by Address / Txn Hash / Sig Hash / Epoch'
const INPUT_ID: Readonly<string> = 'home-search-box'

export const SearchField = ({ inputProps, className, ...props }: SearchFieldProps): ReactNode => {
  return (
    <form nvll-ui="search-field" className={searchFieldStyles({ className })} {...props}>
      <SearchLabel htmlFor={INPUT_ID}>{LABEL_TEXT}</SearchLabel>
      <div className={searchFieldInnerStyles()}>
        <IconWrapper>
          <SearchIcon />
        </IconWrapper>
        <SearchInput id={INPUT_ID} placeholder={PLACEHOLDER_TEXT} required {...inputProps} />
      </div>
    </form>
  )
}
