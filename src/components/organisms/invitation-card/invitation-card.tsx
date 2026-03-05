import type { ReactNode } from 'react'

import { Divider } from '@/components/atoms/divider'

import { InvitationHeader } from '@/components/molecules/invitation-header'
import { SignInLink } from '@/components/molecules/sign-in-link'

import { InvitationForm } from '@/components/organisms/invitation-form'

import { invitationCardStyles } from './invitation-card.styles'

import type { InvitationCardProps } from './invitation-card.types'

export function InvitationCard({ onValidCode, className, ...props }: InvitationCardProps): ReactNode {
  return (
    <div nvll-ui="invitation-card" className={invitationCardStyles({ className })} {...props}>
      <InvitationHeader />
      <InvitationForm onValidCode={onValidCode} />
      <Divider text="Already registered?" />
      <SignInLink />
    </div>
  )
}
