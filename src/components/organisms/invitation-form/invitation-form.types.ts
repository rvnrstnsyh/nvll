import type { FormHTMLAttributes } from 'react'

import type { invitationFormStyles } from './invitation-form.styles'

import type { VariantProps } from 'class-variance-authority'

export interface InvitationFormProps extends FormHTMLAttributes<HTMLFormElement>, VariantProps<typeof invitationFormStyles> {
  onValidCode?: (code: string) => void
}
