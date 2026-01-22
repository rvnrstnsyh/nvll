import type { HTMLAttributes } from 'react'

export interface SignUpLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  href?: string
  text?: string
}
