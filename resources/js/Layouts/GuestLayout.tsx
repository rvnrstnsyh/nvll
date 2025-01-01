import Background from '@/assets/svg/Background'
import Logo from '@/assets/svg/Logo'
import GuestFooter from '@/Components/GuestFooter'

import { Link } from '@inertiajs/react'
import { PropsWithChildren } from 'react'

export default function Guest({ children }: PropsWithChildren) {
  return (
    <div className="relative flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
      <Background className="absolute -top-5 left-0 z-0 max-w-lg translate-x-[-20%] translate-y-[-30%] transform md:max-w-[877px] md:translate-y-0" />
      <div className="relative z-10">
        <Link href="/">
          <Logo className="mb-10 mt-4 h-32 w-32 fill-current text-gray-800" />
        </Link>
      </div>
      <div className="relative z-10 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">{children}</div>
      <GuestFooter />
    </div>
  )
}
