import PasswordEye from '@/assets/svg/PasswordEye'

import { useEffect } from 'react'

export default function TogglePassword({ target }: { target: string[] }): JSX.Element {
  useEffect(() => window.HSStaticMethods.autoInit(), [])

  return (
    <button
      type="button"
      data-hs-toggle-password={`{ "target": ${JSON.stringify(target)} }`}
      className="absolute inset-y-0 end-0 z-20 flex cursor-pointer items-center rounded-e-md px-3 text-gray-400 focus:text-gray-600 focus:outline-none"
    >
      <PasswordEye className="size-3.5 shrink-0" />
    </button>
  )
}
