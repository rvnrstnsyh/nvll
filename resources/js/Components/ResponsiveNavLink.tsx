import { InertiaLinkProps, Link } from '@inertiajs/react'

interface Props {
  active?: boolean
}

export default function ResponsiveNavLink({ active = false, className = '', children, ...props }: InertiaLinkProps & Props): JSX.Element {
  return (
    <Link
      {...props}
      className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${
        active
          ? 'border-gray-400 bg-gray-50 text-gray-700 focus:border-gray-700 focus:bg-gray-100 focus:text-gray-800'
          : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 focus:border-gray-300 focus:bg-gray-50 focus:text-gray-800'
      } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
    >
      {children}
    </Link>
  )
}
