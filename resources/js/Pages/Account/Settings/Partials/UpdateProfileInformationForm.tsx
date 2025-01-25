import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import axios from 'axios'

import { useZeroTrust } from '@/Context/ZeroTrust'
import { Transition } from '@headlessui/react'
import { Link, router, useForm, usePage } from '@inertiajs/react'
import { utf8ToBytes } from '@noble/ciphers/utils'
import { FormEventHandler, useState } from 'react'
import { z } from 'zod'

interface Props {
  mustVerifyEmail: boolean
  status?: string
  className?: string
}

const formSchema: z.ZodType = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: 'Name must be at least 3 characters long.' })
    .max(255, { message: 'Name must be at most 255 characters long.' }),
  email: z.string().trim().email({ message: 'The email field must be a valid email address.' })
})

type ProfileInformationValidationSchema = z.infer<typeof formSchema>

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }: Props) {
  const [recentlySuccessful, setRecentlySuccessful] = useState<boolean>(false)
  const [processing, setProcessing] = useState<boolean>(false)
  const { Aes } = useZeroTrust()
  const user = usePage().props.auth.user
  const { data, setData, errors, setError } = useForm({
    name: user.name,
    email: user.email
  })

  const submit: FormEventHandler = async (event: React.FormEvent<Element>): Promise<void> => {
    event.preventDefault()
    setProcessing(true)
    setRecentlySuccessful(false)

    const validation: z.SafeParseReturnType<typeof data, ProfileInformationValidationSchema> = formSchema.safeParse(data)
    if (!validation.success) {
      // Clear previous errors that are no longer present in current validation.
      Object.keys(errors).forEach((key: string): void => {
        if (!validation.error.errors.some((error) => error.path[0] === key)) setError(key as keyof typeof errors, '')
      })
      // Set new validation errors.
      validation.error.errors.forEach((error): void => {
        const key = error.path[0] as keyof typeof data
        setError(key, error.message)
      })
      return setProcessing(false)
    }

    const headers: { [key: string]: string } = { 'Content-Type': 'application/json' }
    const seal: string = await Aes.encrypt(utf8ToBytes(JSON.stringify(data)))
    await axios
      .patch(route('account-settings.update'), { seal }, { headers })
      .then((response) => {
        if (response.status === 202) {
          setProcessing(false)
          setRecentlySuccessful(true)
        }
      })
      .catch((error) => {
        if (error.response.data.errors) {
          for (const [key, value] of Object.entries(error.response.data.errors)) {
            setError(key as keyof typeof data, (value as string[])[0])
          }
        } else setError('name', error.response.data.message)
        setProcessing(false)
      })
      .finally(() =>
        setTimeout(async () => {
          setRecentlySuccessful(false)
          if (data.email !== user.email) {
            await axios.post(route('verification.send')).finally(() => {
              router.visit(route('verification.notice'), { method: 'get' })
            })
          }
        }, 750)
      )
  }

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
        <p className="mt-1 text-sm text-gray-600">Update your account's profile information and email address.</p>
      </header>

      <form onSubmit={submit} className="mt-6 space-y-6">
        <div>
          <InputLabel htmlFor="name" value="Name" />
          <TextInput
            id="name"
            className="mt-1 block w-full"
            value={data.name}
            onChange={(event) => setData('name', event.target.value)}
            autoComplete="name"
          />
          <InputError className="mt-2" message={errors.name} />
        </div>

        <div>
          <InputLabel htmlFor="email" value="Email" />
          <TextInput
            id="email"
            type="text"
            className="mt-1 block w-full"
            value={data.email}
            onChange={(event) => setData('email', event.target.value)}
            autoComplete="username"
          />
          <InputError className="mt-2" message={errors.email} />
        </div>

        {mustVerifyEmail && user.email_verified_at === null && (
          <div>
            <p className="mt-2 text-sm text-gray-800">
              Your email address is unverified.
              <Link
                href={route('verification.send')}
                method="post"
                as="button"
                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Click here to re-send the verification email.
              </Link>
            </p>

            {status === 'verification-link-sent' && (
              <div className="mt-2 text-sm font-medium text-green-600">A new verification link has been sent to your email address.</div>
            )}
          </div>
        )}

        <div className="flex items-center gap-4">
          <PrimaryButton disabled={processing}>Save</PrimaryButton>
          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-green-600">Saved.</p>
          </Transition>
        </div>
      </form>
    </section>
  )
}
