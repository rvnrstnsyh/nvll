import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'

import { User } from '@/types'
import { Head, usePage } from '@inertiajs/react'

export default function Dashboard() {
  const user: User = usePage().props.auth.user

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Dashboard | <span className="text-xs text-gray-400">Insights and Quick Access for NVLL</span>
        </h2>
      }
    >
      <Head title="Dashboard" />
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">Glad to see you, {user.email}.</div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
