import type { HTMLAttributes } from 'react'

import type { securityNoticeStyles } from './security-notice.styles'

import type { VariantProps } from 'class-variance-authority'

export interface SecurityNoticeProps extends HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof securityNoticeStyles> {}
