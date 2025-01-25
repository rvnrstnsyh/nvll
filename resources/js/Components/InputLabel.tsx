import { LabelHTMLAttributes } from 'react'

interface Props {
  value?: string
}

export default function InputLabel({ value, className = '', children, ...props }: LabelHTMLAttributes<HTMLLabelElement> & Props): JSX.Element {
  return (
    <label {...props} className={`block text-sm font-medium text-gray-700 ` + className}>
      {value ? value : children}
    </label>
  )
}
