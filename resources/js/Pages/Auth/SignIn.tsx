import Checkbox from '@/Components/Checkbox'
import EntranceHead from '@/Components/EntranceHead'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import TogglePassword from '@/Components/TogglePassword'
import GuestLayout from '@/Layouts/GuestLayout'

import { Head, Link, useForm } from '@inertiajs/react'
import { FormEventHandler, useState } from 'react'
import { z } from 'zod'

interface Props {
  status?: string
  canResetPassword: boolean
}

const formSchema: z.ZodType = z.object({
  email: z.string().trim().email({ message: 'The email field is required or invalid.' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .refine((password) => /[a-z]/.test(password), { message: 'Password must contain at least one lowercase letter.' })
    .refine((password) => /[A-Z]/.test(password), { message: 'Password must contain at least one uppercase letter.' })
    .refine((password) => /[0-9]/.test(password), { message: 'Password must contain at least one number.' })
    .refine((password) => /[\W_]/.test(password), { message: 'Password must contain at least one special character.' }),
  remember: z.boolean()
})

type SignInValidationSchema = z.infer<typeof formSchema>

export default function SignIn({ status, canResetPassword }: Props) {
  const [rememberNotice, setRememberNotice] = useState(false)
  const { data, setData, post, processing, errors, reset, setError } = useForm({
    email: '',
    password: '',
    remember: false
  })
  const submit: FormEventHandler = (event) => {
    event.preventDefault()
    const validation: z.SafeParseReturnType<typeof data, SignInValidationSchema> = formSchema.safeParse(data)
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
    post(route('sign-in.store'), {
      onFinish: () => reset('password'),
      onError: () => reset('password')
    })
  }

  return (
    <GuestLayout>
      <Head title="Sign In" />
      <EntranceHead title="SIGN IN" subtitle="To continue enter your account details" />
      {status && <div className="mb-4 mt-2 text-sm font-medium text-green-600">{status}</div>}
      <form onSubmit={submit} className="mt-4">
        <div>
          <InputLabel htmlFor="email" value="Username or email address" />
          <TextInput
            id="email"
            type="text"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            isFocused={true}
            onChange={(event) => setData('email', event.target.value)}
            placeholder="e.g. chernobyl or chernobyl@nvll.me"
          />
          <InputError message={errors.email} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="hs-sign-in-password" value="Password" />
          <div className="relative">
            <TextInput
              id="hs-sign-in-password"
              type="password"
              name="password"
              value={data.password}
              className="mt-1 block w-full"
              autoComplete="current-password"
              onChange={(event) => setData('password', event.target.value)}
              placeholder={'*'.repeat(18)}
            />
            <TogglePassword target={['#hs-sign-in-password']} />
          </div>
          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="mt-0 block">
          <div className="flex items-end">
            <label className="flex items-center">
              <Checkbox name="remember" checked={data.remember} onChange={(event) => setData('remember', event.target.checked)} />
              <span className="ms-2 mt-4 text-sm leading-3 text-gray-600">
                Keep me signed in
                <br />
                <span className="text-xs text-gray-400">Recommended on trusted devices.&nbsp;</span>
              </span>
            </label>
            <span className="anchor-text cursor-pointer text-xs" onClick={() => setRememberNotice(!rememberNotice)}>
              Why?
            </span>
          </div>
          {rememberNotice && (
            <p className="my-2 text-justify text-xs text-gray-400">
              It's recommended to stay signed in to your NVLL Account on trusted devices, as this ensures session persistence and enables device data
              recovery. By selecting the "Keep me signed in" checkbox, you avoid repeated logins and maintain access to key features. However, on
              untrusted or public devices, it is crucial not to use this feature and, for enhanced security, to use private or incognito mode to
              prevent sensitive data from being stored and accessed by others.
            </p>
          )}
        </div>

        <div className="mt-4 flex items-center justify-end">
          {canResetPassword && (
            <div>
              <Link href={route('forgot-password.create')} className="anchor-text mr-4 text-sm">
                Forgot password?
              </Link>
              <Link href={route('sign-up.create')} className="anchor-text text-sm">
                Create account
              </Link>
            </div>
          )}
          <PrimaryButton className="ms-4" disabled={processing}>
            Sign In
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  )
}
