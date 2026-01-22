import type { HTMLAttributes } from 'react'

import type { invitationCardStyles } from './invitation-card.styles'

import type { VariantProps } from 'class-variance-authority'

export interface InvitationCardProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof invitationCardStyles> {
  onValidCode?: (code: string) => void
}
