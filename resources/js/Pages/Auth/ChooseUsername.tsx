import EntranceHead from '@/Components/EntranceHead'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import Stepper from '@/Components/Stepper'
import TextInput from '@/Components/TextInput'
import GuestLayout from '@/Layouts/GuestLayout'

import { Head, Link, useForm } from '@inertiajs/react'
import { FormEventHandler } from 'react'
import { z } from 'zod'

const formSchema: z.ZodType = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: 'Username must be at least 3 characters long.' })
    .max(64, { message: 'Username must not be longer than 64 characters.' })
    .regex(/^[a-z0-9.]+$/, { message: 'Username can only contain letters, numbers, and periods.' })
})

type ChooseUsernameValidationSchema = z.infer<typeof formSchema>

export default function ChooseUsername({ username }: { username?: string }) {
  const steps = [{ name: 'Account', description: 'Info' }, { name: 'Choose', description: 'Username' }, { name: 'Email Verification' }]
  const { data, setData, post, processing, errors, setError } = useForm({ username: username || '' })
  const submit: FormEventHandler = (event) => {
    event.preventDefault()
    const validation: z.SafeParseReturnType<typeof data, ChooseUsernameValidationSchema> = formSchema.safeParse(data)
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
    post(route('choose-username.store'))
  }

  return (
    <GuestLayout>
      <Head title="Choose Username" />
      <EntranceHead
        title="SIGN UP | Choose Username"
        subtitle="Choose your username carefully, as it cannot be changed or deleted once your email is verified. This will be your permanent identity on the platform"
      />
      <Stepper steps={steps} currentStep={1} />
      <form onSubmit={submit} className="mt-4">
        <div className="mt-4">
          <InputLabel htmlFor="username" value="Username (immutable name)" />
          <div className="relative">
            <TextInput
              id="username"
              name="username"
              value={data.username}
              className="mt-1 block w-full pe-[81.5px] text-end"
              isFocused={true}
              onChange={(event) => setData('username', event.target.value)}
              autoComplete="username"
            />
            <div className="pointer-events-none absolute inset-y-0 end-0 z-20 flex items-center pe-4 text-gray-400">@nvll.me</div>
          </div>
        </div>
        <InputError message={errors.username} className="mt-2" />
        <div className="mt-4 flex items-center justify-end">
          <Link href={route('sign-out.destroy')} method="post" as="button" className="anchor-text text-sm">
            Sign Out
          </Link>
          <PrimaryButton className="ms-4" disabled={processing}>
            Next
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  )
}
