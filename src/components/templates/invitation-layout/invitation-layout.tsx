import type { ReactNode } from 'react'

import { InvitationCard } from '@/components/organisms/invitation-card'

import { invitationLayoutStyles } from './invitation-layout.styles'

import type { InvitationLayoutProps } from './invitation-layout.types'

export function InvitationLayout({ onValidCode, className, ...props }: InvitationLayoutProps): ReactNode {
  return (
    <div data-ui="invitation-layout" className={invitationLayoutStyles({ className })} {...props}>
      <div className="overlay" />
      <InvitationCard onValidCode={onValidCode} />
    </div>
  )
}
