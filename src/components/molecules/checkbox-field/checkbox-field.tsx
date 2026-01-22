'use client'

import { forwardRef } from 'react'

import type { ReactNode } from 'react'

import { CheckboxInput } from '@/components/atoms/checkbox-input'

import { checkboxFieldStyles, checkboxLabelStyles, checkboxBoxStyles, checkboxTextStyles, checkboxSubtextStyles } from './checkbox-field.styles'

import type { CheckboxFieldProps } from './checkbox-field.types'

export const CheckboxField = forwardRef<HTMLInputElement, CheckboxFieldProps>(({ id, label, subtext, className, ...props }, ref): ReactNode => {
  return (
    <div nvll-ui="checkbox-field" className={checkboxFieldStyles({ className })}>
      <CheckboxInput id={id} ref={ref} {...props} />
      <label htmlFor={id} className={checkboxLabelStyles()}>
        <div className={checkboxBoxStyles()} />
        <span className={checkboxTextStyles()}>
          {label}
          {subtext && (
            <>
              <br />
              <span className={checkboxSubtextStyles()}>{subtext}</span>
            </>
          )}
        </span>
      </label>
    </div>
  )
})

CheckboxField.displayName = 'CheckboxField'
