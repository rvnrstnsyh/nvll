import type { ReactNode } from 'react'

import Link from 'next/link'

import { invitationHeaderStyles, headerTitleStyles, headerDescriptionStyles } from './invitation-header.styles'

import type { InvitationHeaderProps } from './invitation-header.types'

export function InvitationHeader({ title = 'NVLL | Invitation', description = 'Enter your invitation code to proceed', href = '/', className, ...props }: InvitationHeaderProps): ReactNode {
  return (
    <div data-ui="invitation-header" className={invitationHeaderStyles({ className })} {...props}>
      <Link href={href}>
        <h2 className={headerTitleStyles()}>{title}</h2>
        <p className={headerDescriptionStyles()}>{description}</p>
      </Link>
    </div>
  )
}
