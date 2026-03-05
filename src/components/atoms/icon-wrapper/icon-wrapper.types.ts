import type { HTMLAttributes, ReactNode } from 'react'

export interface IconWrapperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
}
