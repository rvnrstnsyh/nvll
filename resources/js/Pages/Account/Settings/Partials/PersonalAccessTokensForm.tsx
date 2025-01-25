import Globe from '@/assets/svg/Globe'
import Key from '@/assets/svg/Key'
import Plus from '@/assets/svg/Plus'
import TrashCan from '@/assets/svg/TrashCan'
import PrimaryButton from '@/Components/PrimaryButton'

import { Transition } from '@headlessui/react'

export default function PersonalAccessTokensForm({ className = '' }: { className?: string }): JSX.Element {
  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">Personal Access Tokens</h2>
        <p className="mt-1 text-sm text-gray-600">Personal access tokens can be used to create deployments using deployctl.</p>
      </header>

      <form className="mt-6 space-y-6">
        <ul className="m-b-1 rounded-lg border border-gray-200 bg-white py-1">
          <li className="border-b-1 flex min-h-12 w-full items-center justify-between border-gray-200/50 px-4 last:!border-0">
            <div className="my-3 flex flex-col items-start gap-2 text-gray-600 md:!my-0 md:!flex-row md:!items-center">
              <div className="flex items-center gap-1.5">
                <Globe />
                <span className="font-medium">Web Token</span>
                <span className="px-1 text-xs text-gray-400">Logged in 3 hours ago, expires in 2 days</span>
              </div>
            </div>
            <button type="button" className="hover:text-danger cursor-pointer text-gray-600 transition-colors" title="Remove member">
              <TrashCan />
            </button>
          </li>
          <li className="border-b-1 flex min-h-12 w-full items-center justify-between border-gray-200/50 px-4 last:!border-0">
            <div className="my-3 flex flex-col items-start gap-2 text-gray-600 md:!my-0 md:!flex-row md:!items-center">
              <div className="flex items-center gap-1.5">
                <Key />
                <span className="font-medium">DenoKV</span>
                <span className="px-1 text-xs text-gray-400">Created 4 months ago</span>
              </div>
            </div>
            <button type="button" className="hover:text-danger cursor-pointer text-gray-600 transition-colors" title="Remove member">
              <TrashCan />
            </button>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          <PrimaryButton>
            <Plus />
            &nbsp; New Access Token
          </PrimaryButton>
          <Transition show={false} enter="transition ease-in-out" enterFrom="opacity-0" leave="transition ease-in-out" leaveTo="opacity-0">
            <p className="text-sm text-gray-600">Saved.</p>
          </Transition>
        </div>
      </form>
    </section>
  )
}
