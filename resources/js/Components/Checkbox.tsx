import { InputHTMLAttributes } from 'react'

export default function Checkbox({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>): JSX.Element {
  return <input {...props} type="checkbox" className={'rounded border-gray-300 text-gray-600 shadow-sm focus:ring-gray-500 ' + className} />
}
