import type { ReactNode } from 'react'

import { securityNoticeStyles } from './security-notice.styles'

import type { SecurityNoticeProps } from './security-notice.types'

export function SecurityNotice({ children, className, ...props }: SecurityNoticeProps): ReactNode {
  const defaultText: string = `It's recommended to stay signed in to your NVLL Account on trusted devices, as this ensures session persistence and enables device data recovery. By selecting the "Keep me signed in" checkbox, you avoid repeated logins and maintain access to key features. However, on untrusted or public devices, it is crucial not to use this feature and, for enhanced security, to use private or incognito mode to prevent sensitive data from being stored and accessed by others.`

  return (
    <p nvll-ui="security-notice" className={securityNoticeStyles({ className })} {...props}>
      {children || defaultText}
    </p>
  )
}
