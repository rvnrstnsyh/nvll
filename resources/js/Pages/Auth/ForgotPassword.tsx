import EntranceHead from '@/Components/EntranceHead'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import GuestLayout from '@/Layouts/GuestLayout'

import { Head, Link, useForm } from '@inertiajs/react'
import { FormEventHandler } from 'react'
import { z } from 'zod'

const formSchema: z.ZodType = z.object({ email: z.string().trim().email({ message: 'The email field is required or invalid.' }) })

type ForgotPasswordValidationSchema = z.infer<typeof formSchema>

export default function ForgotPassword({ status }: { status?: string }) {
  const { data, setData, post, processing, errors, setError } = useForm({
    email: ''
  })
  const submit: FormEventHandler = (event) => {
    event.preventDefault()
    const validation: z.SafeParseReturnType<typeof data, ForgotPasswordValidationSchema> = formSchema.safeParse(data)
    if (!validation.success) {
      // Clear previous errors that are no longer present in current validation
      Object.keys(errors).forEach((key: string) => {
        if (!validation.error.errors.some((error) => error.path[0] === key)) setError(key as keyof typeof errors, '')
      })
      // Set new validation errors
      validation.error.errors.forEach((error) => {
        const key = error.path[0] as keyof typeof data
        setError(key, error.message)
      })
      return
    }
    post(route('forgot-password.store'))
  }

  return (
    <GuestLayout>
      <Head title="Forgot Password" />
      <EntranceHead
        title="Forgot Password?"
        subtitle="Let us know your email address and we will email you a password reset link that will allow you to choose a new one"
      />
      {status && <div className="mb-4 mt-2 text-sm font-medium text-green-600">{status}</div>}
      <form onSubmit={submit} className="mt-4">
        <InputLabel htmlFor="email" value="Email" />
        <TextInput
          id="email"
          type="text"
          name="email"
          value={data.email}
          className="mt-1 block w-full"
          isFocused={true}
          onChange={(event) => setData('email', event.target.value)}
          placeholder="e.g. chernobyl@nvll.me"
        />
        <InputError message={errors.email} className="mt-2" />
        <div className="mt-4 flex items-center justify-end">
          <Link href={route('sign-in.create')} className="anchor-text text-sm">
            I seem to remember
          </Link>
          <PrimaryButton className="ms-4" disabled={processing}>
            Send link
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  )
}
