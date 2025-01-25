import { forwardRef, InputHTMLAttributes, useEffect, useImperativeHandle, useRef } from 'react'

interface Props {
  isFocused?: boolean
}

export default forwardRef(function TextInput(
  { type = 'text', className = '', isFocused = false, ...props }: InputHTMLAttributes<HTMLInputElement> & Props,
  ref
): JSX.Element {
  const localRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus()
  }))
  useEffect(() => {
    if (isFocused) localRef.current?.focus()
  }, [isFocused])

  return (
    <input
      {...props}
      type={type}
      className={'rounded-md border-gray-300 shadow-sm focus:border-gray-800 focus:ring-gray-800 ' + className}
      ref={localRef}
    />
  )
})
