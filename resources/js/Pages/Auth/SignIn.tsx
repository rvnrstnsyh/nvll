import Checkbox from '@/Components/Checkbox'
import EntranceHead from '@/Components/EntranceHead'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import TogglePassword from '@/Components/TogglePassword'
import GuestLayout from '@/Layouts/GuestLayout'
import axios from 'axios'
import sodium from 'libsodium-wrappers'

import { useZeroTrust } from '@/Context/ZeroTrust'
import { Head, Link, router, useForm } from '@inertiajs/react'
import { bytesToUtf8, utf8ToBytes } from '@noble/ciphers/utils'
import { FormEventHandler, useEffect, useState } from 'react'
import { z } from 'zod'

interface Props {
  canResetPassword: boolean
}

const formSchema: z.ZodType = z.object({
  email: z.string().trim().email({ message: 'The email field must be a valid email address.' }),
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

export default function SignIn({ canResetPassword }: Props): JSX.Element {
  const [status, setStatus] = useState<string>('')
  const [processing, setProcessing] = useState<boolean>(false)
  const { Aes } = useZeroTrust()
  const [rememberNotice, setRememberNotice] = useState<boolean>(false)
  const { data, setData, errors, reset, setError } = useForm<SignInValidationSchema>({
    email: '',
    password: '',
    remember: false
  })

  useEffect((): void => {
    const checkStatus = async (): Promise<void> => {
      const status: string | null = sessionStorage.getItem('status')
      if (status) {
        try {
          await sodium.ready
          setStatus(bytesToUtf8(sodium.from_base64(String(status), sodium.base64_variants.ORIGINAL)))
        } catch (_error) {
          //
        }
        sessionStorage.removeItem('status')
      }
    }
    checkStatus()
  }, [])

  const submit: FormEventHandler = async (event: React.FormEvent<Element>): Promise<void> => {
    event.preventDefault()
    setStatus('')
    setProcessing(true)

    const validation: z.SafeParseReturnType<typeof data, SignInValidationSchema> = formSchema.safeParse(data)
    if (!validation.success) {
      // Clear previous errors that are no longer present in current validation.
      Object.keys(errors).forEach((key: string): void => {
        if (!validation.error.errors.some((error: z.ZodIssue): boolean => error.path[0] === key)) setError(key as keyof typeof errors, '')
      })
      // Set new validation errors.
      validation.error.errors.forEach((error: z.ZodIssue): void => {
        const key = error.path[0] as keyof typeof data
        setError(key, error.message)
      })
      setStatus('')
      return setProcessing(false)
    }

    const headers: { [key: string]: string } = { 'Content-Type': 'application/json' }
    const seal: string = await Aes.encrypt(utf8ToBytes(JSON.stringify(data)))
    await axios
      .post(route('sign-in.store'), { seal }, { headers })
      .then((response): void => {
        if (response.status === 200) router.visit(route('dashboard.create'), { method: 'get' })
      })
      .catch((error): void => {
        if (error.response.data.errors) {
          for (const [key, value] of Object.entries(error.response.data.errors)) {
            setError(key as keyof typeof data, (value as string[])[0])
          }
        } else setError('email', error.response.data.message)
        setStatus('')
        reset('password')
        setProcessing(false)
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
