import Logo from '@/assets/svg/Logo'
import MenuBurger from '@/assets/svg/MenuBurger'
import AuthenticatedFooter from '@/Components/AuthenticatedFooter'
import Dropdown from '@/Components/Dropdown'
import Identicon from '@/Components/Identicon'
import NavLink from '@/Components/NavLink'
import ResponsiveNavLink from '@/Components/ResponsiveNavLink'

import { Link, usePage } from '@inertiajs/react'
import { PropsWithChildren, ReactNode, useState } from 'react'

export default function Authenticated({ header, children }: PropsWithChildren<{ header?: ReactNode }>) {
  const user = usePage().props.auth.user
  const [showNavDropdown, setShowNavDropdown] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex shrink-0 items-center">
                <Link href={route('dashboard.create')}>
                  <Logo className="block h-10 w-full fill-current text-gray-800" />
                </Link>
              </div>

              <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                <NavLink href={route('dashboard.create')} active={route().current('dashboard.create')}>
                  Dashboard
                </NavLink>
              </div>
            </div>

            <div className="hidden sm:ms-6 sm:flex sm:items-center">
              <div className="relative ms-3">
                <Dropdown>
                  <Dropdown.Trigger>
                    <span className="inline-flex rounded-md">
                      <button
                        type="button"
                        className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-end text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-800 focus:outline-none"
                      >
                        <div className="flex flex-col text-end">
                          <span>{user.name}</span>
                          <span className="text-xs text-gray-400">{user.email}</span>
                        </div>
                        <Identicon className="identicon -me-3 ms-3 inline-block" seed={user.id} />
                      </button>
                    </span>
                  </Dropdown.Trigger>

                  <Dropdown.Content align="right">
                    <Dropdown.Link href={route('account-settings.create')}>Account Settings</Dropdown.Link>
                    <Dropdown.Link href={route('sign-out.destroy')} method="post" as="button">
                      Sign Out
                    </Dropdown.Link>
                  </Dropdown.Content>
                </Dropdown>
              </div>
            </div>

            <div className="-me-2 flex items-center sm:hidden">
              <button
                onClick={() => setShowNavDropdown((previousState) => !previousState)}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
              >
                <MenuBurger
                  className1="h-6 w-6"
                  className2={!showNavDropdown ? 'inline-flex' : 'hidden'}
                  className3={showNavDropdown ? 'inline-flex' : 'hidden'}
                />
              </button>
            </div>
          </div>
        </div>

        <div className={(showNavDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
          <div className="space-y-1 pb-3 pt-2">
            <ResponsiveNavLink href={route('dashboard.create')} active={route().current('dashboard.create')}>
              Dashboard
            </ResponsiveNavLink>
          </div>

          <div className="border-t border-gray-200 pb-1 pt-4">
            <div className="px-4">
              <div className="text-base font-medium text-gray-800">{user.name}</div>
              <div className="text-sm font-medium text-gray-400">{user.email}</div>
            </div>

            <div className="mt-3 space-y-1">
              <ResponsiveNavLink href={route('account-settings.create')}>Account Settings</ResponsiveNavLink>
              <ResponsiveNavLink method="post" href={route('sign-out.destroy')} as="button">
                Sign Out
              </ResponsiveNavLink>
            </div>
          </div>
        </div>
      </nav>

      {header && (
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{header}</div>
        </header>
      )}

      <main>{children}</main>
      <AuthenticatedFooter />
    </div>
  )
}
