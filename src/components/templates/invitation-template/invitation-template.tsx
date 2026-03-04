import type { ReactNode } from 'react'

import { InvitationCard } from '@/components/organisms/invitation-card'

import { invitationTemplateStyles } from './invitation-template.styles'

import type { InvitationTemplateProps } from './invitation-template.types'

export function InvitationTemplate({ onValidCode, className, ...props }: InvitationTemplateProps): ReactNode {
  return (
    <div data-ui="invitation-template" className={invitationTemplateStyles({ className })} {...props}>
      <div className="overlay" />
      <InvitationCard onValidCode={onValidCode} />
    </div>
  )
}
