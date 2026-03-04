import type { HTMLAttributes } from 'react'

import type { invitationTemplateStyles } from './invitation-template.styles'

import type { VariantProps } from 'class-variance-authority'

export interface InvitationTemplateProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof invitationTemplateStyles> {
  onValidCode?: (code: string) => void
}
