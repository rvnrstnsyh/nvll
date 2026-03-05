import type { LabelHTMLAttributes, ReactNode } from 'react'

export interface SearchLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode
  className?: string
}
