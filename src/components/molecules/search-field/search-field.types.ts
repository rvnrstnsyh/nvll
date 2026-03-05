import type { FormHTMLAttributes } from 'react'

import type { SearchInputProps } from '@/components/atoms/search-input'

export interface SearchFieldProps extends FormHTMLAttributes<HTMLFormElement> {
  inputProps?: SearchInputProps
}
