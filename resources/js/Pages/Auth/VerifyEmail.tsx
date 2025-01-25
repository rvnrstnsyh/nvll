import EntranceHead from '@/Components/EntranceHead'
import PrimaryButton from '@/Components/PrimaryButton'
import SecondaryButton from '@/Components/SecondaryButton'
import Stepper from '@/Components/Stepper'
import GuestLayout from '@/Layouts/GuestLayout'

import { Head, Link, router, useForm, usePage } from '@inertiajs/react'
import { FormEventHandler } from 'react'

interface Props {
  status?: string
  canChangeUsername?: boolean
}

export default function VerifyEmail({ status, canChangeUsername }: Props) {
  const user = usePage().props.auth.user
  const steps = [{ name: 'Account', description: 'Info' }, { name: 'Choose', description: 'Username' }, { name: 'Email Verification' }]
  const { post, processing } = useForm({})
  const submit: FormEventHandler = (event: React.FormEvent<Element>): void => {
    event.preventDefault()
    post(route('verification.send'))
  }
  const handlePrevious = (): void => {
    if (!user.email_verified_at) {
      return router.get(route('choose-username.create'))
    } else {
      return router.get(route('dashboard.create'))
    }
  }

  return (
    <GuestLayout>
      <Head title={`${canChangeUsername ? 'Email Verification' : 'Re-verify Email'}`} />
      <EntranceHead
        title={`${canChangeUsername ? 'SIGN UP | Email Verification' : 'Re-verify Email'}`}
        subtitle={`${canChangeUsername ? 'One more step before getting started, c' : 'C'}ould you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another to ${user.email}`}
      />
      <Stepper steps={steps} currentStep={2} />
      {status === 'verification-link-sent' && (
        <div className="mb-4 mt-2 text-sm font-medium text-green-600">
          A new verification link has been sent to the email address you provided during registration.
        </div>
      )}
      <form onSubmit={submit}>
        <div className="mt-4 flex items-center justify-end gap-2">
          <Link href={route('sign-out.destroy')} method="post" as="button" className="anchor-text mr-[1px] text-sm">
            Sign Out
          </Link>
          {canChangeUsername && <SecondaryButton onClick={handlePrevious}>Previous</SecondaryButton>}
          <PrimaryButton disabled={processing}>(Re)send</PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  )
}
