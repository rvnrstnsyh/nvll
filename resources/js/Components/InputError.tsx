import { HTMLAttributes } from 'react'

interface Props {
  message?: string
}

export default function InputError({ message, className = '', ...props }: HTMLAttributes<HTMLParagraphElement> & Props): JSX.Element | null {
  return message ? (
    <p {...props} className={'text-sm text-red-600 ' + className}>
      {message}
    </p>
  ) : null
}
