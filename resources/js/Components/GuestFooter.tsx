import { Link, usePage } from '@inertiajs/react'

export default function GuestFooter(): JSX.Element {
  const pathUrl: string = usePage().url

  return (
    <footer className="mx-auto mt-4 w-full max-w-[500px] px-4 sm:px-6 lg:px-8">
      <div className="border-t border-gray-200 py-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-xs text-gray-600">© 2025 Non-Violable Liberty Layers.</p>
          </div>
          <ul className="flex flex-wrap items-center">
            {pathUrl !== '/' && (
              <li className="relative inline-block pe-4 text-xs before:absolute before:end-1.5 before:top-1/2 before:size-[3px] before:-translate-y-1/2 before:rounded-full before:bg-gray-400 last:pe-0 last-of-type:before:hidden">
                <Link className="anchor-text text-xs" href={route('about.create')}>
                  About
                </Link>
              </li>
            )}
            <li className="relative inline-block pe-4 text-xs before:absolute before:end-1.5 before:top-1/2 before:size-[3px] before:-translate-y-1/2 before:rounded-full before:bg-gray-400 last:pe-0 last-of-type:before:hidden">
              <a className="anchor-text text-xs" href="mailto:re@nvll.me">
                Contact
              </a>
            </li>
            <li className="relative inline-block pe-4 text-xs before:absolute before:end-1.5 before:top-1/2 before:size-[3px] before:-translate-y-1/2 before:rounded-full before:bg-gray-400 last:pe-0 last-of-type:before:hidden">
              <a className="anchor-text text-xs" href="https://github.com/rvnrstnsyh/nvll" target="_blank" rel="me noopener noreferrer nofollow">
                GitHub
              </a>
            </li>
            <li className="inline-block pe-4 text-xs">
              <a className="anchor-text text-xs" href="https://gitlab.com/rvnrstnsyh.gpg" target="_blank" rel="me noopener noreferrer nofollow">
                PGP
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
