import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import DeleteUserForm from './Partials/DeleteUserForm'
import PersonalAccessTokensForm from './Partials/PersonalAccessTokensForm'
import UpdatePasswordForm from './Partials/UpdatePasswordForm'
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm'

import { PageProps } from '@/types'
import { Head } from '@inertiajs/react'

export default function Edit({ mustVerifyEmail, status }: PageProps<{ mustVerifyEmail: boolean; status?: string }>): JSX.Element {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Account Settings | <span className="text-xs text-gray-400">Settings for your personal NVLL account</span>
        </h2>
      }
    >
      <Head title="Account Settings" />
      <div className="py-12">
        <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
          <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
            <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} className="max-w-xl" />
          </div>
          <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
            <UpdatePasswordForm className="max-w-xl" />
          </div>
          <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
            <PersonalAccessTokensForm className="max-w-xl" />
          </div>
          <div className="border border-red-400 bg-white p-4 shadow sm:rounded-lg sm:p-8">
            <section className="bg-white">
              <div className="py-4 lg:py-2">
                <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl">Danger Zone</h1>
              </div>
            </section>
            <DeleteUserForm className="max-w-xl" />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
