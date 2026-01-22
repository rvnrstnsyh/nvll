import type { HTMLAttributes } from 'react'

import type { invitationLayoutStyles } from './invitation-layout.styles'

import type { VariantProps } from 'class-variance-authority'

export interface InvitationLayoutProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof invitationLayoutStyles> {
  onValidCode?: (code: string) => void
}
