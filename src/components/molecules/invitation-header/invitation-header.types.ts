import type { HTMLAttributes } from 'react'

import type { invitationHeaderStyles } from './invitation-header.styles'

import type { VariantProps } from 'class-variance-authority'

export interface InvitationHeaderProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof invitationHeaderStyles> {
  title?: string
  description?: string
  href?: string
  className?: string
}
