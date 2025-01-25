import EntranceHead from '@/Components/EntranceHead'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import GuestLayout from '@/Layouts/GuestLayout'
import axios from 'axios'

import { useZeroTrust } from '@/Context/ZeroTrust'
import { Head, Link, useForm } from '@inertiajs/react'
import { utf8ToBytes } from '@noble/ciphers/utils'
import { FormEventHandler, useState } from 'react'
import { z } from 'zod'

const formSchema: z.ZodType = z.object({ email: z.string().trim().email({ message: 'The email field must be a valid email address.' }) })

type ForgotPasswordValidationSchema = z.infer<typeof formSchema>

export default function ForgotPassword(): JSX.Element {
  const [processing, setProcessing] = useState<boolean>(false)
  const [status, setStatus] = useState<string>('')
  const { Aes } = useZeroTrust()
  const { data, setData, errors, setError } = useForm<ForgotPasswordValidationSchema>({
    email: ''
  })
  const submit: FormEventHandler = async (event: React.FormEvent<Element>): Promise<void> => {
    event.preventDefault()
    setStatus('')
    setProcessing(true)

    const validation: z.SafeParseReturnType<typeof data, ForgotPasswordValidationSchema> = formSchema.safeParse(data)
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

    const headers: { [key: string]: string } = { Accept: 'application/json', 'Content-Type': 'application/json' }
    const seal: string = await Aes.encrypt(utf8ToBytes(JSON.stringify(data)))
    await axios
      .post(route('forgot-password.store'), { seal }, { headers })
      .then((response): void => {
        if (response.status === 200) setStatus(response.data.status)
        setProcessing(false)
      })
      .catch((error): void => {
        setStatus('')
        if (error.response.data.errors) {
          for (const [key, value] of Object.entries(error.response.data.errors)) {
            setError(key as keyof typeof data, (value as string[])[0])
          }
        } else setError('email', error.response.data.message)
        setProcessing(false)
      })
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
