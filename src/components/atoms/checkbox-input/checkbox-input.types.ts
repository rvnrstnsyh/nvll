import type { InputHTMLAttributes } from 'react'

import type { checkboxInputStyles } from './checkbox-input.styles'

import type { VariantProps } from 'class-variance-authority'

export interface CheckboxInputProps extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof checkboxInputStyles> {}
