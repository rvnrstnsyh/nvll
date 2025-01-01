import { forwardRef, InputHTMLAttributes, useEffect, useImperativeHandle, useRef } from 'react'

export default forwardRef(function TextInput(
  {
    type = 'text',
    className = '',
    isFocused = false,
    ...props
  }: InputHTMLAttributes<HTMLInputElement> & {
    isFocused?: boolean
  },
  ref
) {
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
