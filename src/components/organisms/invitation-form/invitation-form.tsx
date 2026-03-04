'use client'

import { useState } from 'react'

import type { ReactNode, SubmitEvent } from 'react'

import { Button } from '@/components/atoms/button'

import { CheckboxField } from '@/components/molecules/checkbox-field'
import { FormGroup } from '@/components/molecules/form-group'
import { SecurityNotice } from '@/components/molecules/security-notice'

import { invitationFormStyles } from './invitation-form.styles'

import type { InvitationFormProps } from './invitation-form.types'

export function InvitationForm({ onValidCode, className, ...props }: InvitationFormProps): ReactNode {
  const [isProcessing, setIsProcessing] = useState(false)
  const [invitationCode, setInvitationCode] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [errors, setErrors] = useState({ code: '' })

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Validate
    if (!invitationCode.trim()) {
      setErrors({ code: 'Invitation code is required' })
      return
    }

    if (!termsAccepted) {
      setErrors({ code: 'You must agree to the terms and conditions' })
      return
    }

    setIsProcessing(true)
    setErrors({ code: '' })

    try {
      // Simulate API validation
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // TODO: Replace with actual validation
      const isValid = invitationCode === 'NVLL2024' // Example validation

      if (isValid) {
        // Store in sessionStorage (not localStorage to avoid browser storage restriction)
        sessionStorage.setItem('invitationCode', invitationCode)
        sessionStorage.setItem('termsAccepted', 'true')

        // Call parent callback
        onValidCode?.(invitationCode)
      } else {
        setErrors({ code: 'Invalid invitation code' })
      }
    } catch (_error) {
      setErrors({ code: 'An error occurred. Please try again.' })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <form data-ui="invitation-form" className={invitationFormStyles({ className })} onSubmit={handleSubmit} noValidate {...props}>
      <FormGroup
        label="Invitation code"
        error={!!errors.code}
        errorMessage={errors.code}
        inputProps={{ id: 'invitationCode', name: 'invitationCode', type: 'text', required: true, autoComplete: 'off', value: invitationCode, onChange: (e) => setInvitationCode(e.target.value) }}
      />
      <CheckboxField
        id="termsAndConditions"
        name="termsAndConditions"
        label="Agree to the terms and conditions"
        subtext="Read on, it's just a little bit."
        checked={termsAccepted}
        onChange={(e) => setTermsAccepted(e.target.checked)}
      />
      <SecurityNotice>
        Non-Violable Liberty Layers assumes no responsibility for any liabilities or damages arising from the use of its services, as each user is solely responsible for ensuring that their actions
        comply with applicable local laws and regulations, and NVLL does not respond to or process any law enforcement or third-party data requests.
      </SecurityNotice>
      <Button text="Apply" processing={isProcessing} type="submit" variant="primary" state="hover" fullWidth />
    </form>
  )
}
