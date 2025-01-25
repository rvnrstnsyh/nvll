import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PasswordRules from '@/Components/PasswordRules'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import TogglePassword from '@/Components/TogglePassword'
import axios from 'axios'

import { useZeroTrust } from '@/Context/ZeroTrust'
import { Transition } from '@headlessui/react'
import { useForm } from '@inertiajs/react'
import { utf8ToBytes } from '@noble/ciphers/utils'
import { FormEventHandler, useRef, useState } from 'react'
import { z } from 'zod'

interface Props {
  className?: string
}

const passwordRules: z.ZodString = z
  .string()
  .trim()
  .min(8, { message: 'Password must be at least 8 characters long.' })
  .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
  .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
  .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
  .regex(/[\W_]/, { message: 'Password must contain at least one special character.' })

const formSchema: z.ZodType = z
  .object({ current_password: passwordRules, password: passwordRules, password_confirmation: passwordRules })
  .refine((data) => data.password === data.password_confirmation, { message: 'Passwords do not match.', path: ['password_confirmation'] })

type UpdatePasswordValidationSchema = z.infer<typeof formSchema>

export default function UpdatePasswordForm({ className = '' }: Props) {
  const [recentlySuccessful, setRecentlySuccessful] = useState<boolean>(false)
  const [processing, setProcessing] = useState<boolean>(false)
  const { Aes } = useZeroTrust()
  const passwordInput = useRef<HTMLInputElement>(null)
  const currentPasswordInput = useRef<HTMLInputElement>(null)
  const { data, setData, errors, reset, setError } = useForm({
    current_password: '',
    password: '',
    password_confirmation: ''
  })
  const strongPasswordOptions = {
    target: '#hs-update-password-new-password',
    hints: '#hs-update-password-hints',
    minLength: 8,
    stripClasses: [
      'hs-strong-password:opacity-100',
      'hs-strong-password-accepted:bg-gray-800',
      'h-2',
      'flex-auto',
      'rounded-sm',
      'bg-gray-800',
      'opacity-10',
      'mx-1'
    ].join(' ')
  }
  const updatePassword: FormEventHandler = async (event: React.FormEvent<Element>): Promise<void> => {
    event.preventDefault()
    setProcessing(true)
    setRecentlySuccessful(false)

    const validation: z.SafeParseReturnType<typeof data, UpdatePasswordValidationSchema> = formSchema.safeParse(data)
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
      .put(route('password.update'), { seal }, { headers })
      .then((response) => {
        if (response.status === 202) {
          reset()
          setProcessing(false)
          setRecentlySuccessful(true)
        }
      })
      .catch((error) => {
        if (error.response.data.errors) {
          for (const [key, value] of Object.entries(error.response.data.errors)) {
            setError(key as keyof typeof data, (value as string[])[0])
          }
          if (errors.password) {
            reset('password', 'password_confirmation')
            passwordInput.current?.focus()
          }
          if (errors.current_password) {
            reset('current_password')
            currentPasswordInput.current?.focus()
          }
        } else setError('password', error.response.data.message)
        setProcessing(false)
      })
      .finally(() => setTimeout(async () => setRecentlySuccessful(false), 750))
  }

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">Update Password</h2>
        <p className="mt-1 text-sm text-gray-600">Ensure your account is using a long, random password to stay secure.</p>
      </header>

      <form onSubmit={updatePassword} className="mt-6 space-y-6">
        <div>
          <InputLabel htmlFor="hs-update-password-current-password" value="Current Password" />
          <div className="relative">
            <TextInput
              id="hs-update-password-current-password"
              ref={currentPasswordInput}
              value={data.current_password}
              onChange={(event) => setData('current_password', event.target.value)}
              type="password"
              className="mt-1 block w-full"
              autoComplete="current-password"
              placeholder={'*'.repeat(18)}
            />
            <TogglePassword target={['#hs-update-password-current-password']} />
          </div>
          <InputError message={errors.current_password} className="mt-2" />
        </div>

        <div data-hs-toggle-password-group>
          <div>
            <InputLabel htmlFor="hs-update-password-new-password" value="New Password" />
            <div className="relative">
              <TextInput
                id="hs-update-password-new-password"
                ref={passwordInput}
                value={data.password}
                onChange={(event) => setData('password', event.target.value)}
                name="password"
                type="password"
                className="mt-1 block w-full"
                autoComplete="new-password"
                placeholder={'*'.repeat(18)}
              />
              <TogglePassword target={['#hs-update-password-new-password', '#hs-update-password-password-confirmation']} />
            </div>
            <InputError message={errors.password} className="mt-2" />
          </div>

          <div className="-mb-4 mt-6">
            <InputLabel htmlFor="hs-update-password-password-confirmation" value="Confirm Password" />
            <div className="relative">
              <TextInput
                id="hs-update-password-password-confirmation"
                value={data.password_confirmation}
                onChange={(event) => setData('password_confirmation', event.target.value)}
                name="password_confirmation"
                type="password"
                className="mt-1 block w-full"
                autoComplete="new-password"
                placeholder={'*'.repeat(18)}
              />
              <TogglePassword target={['#hs-update-password-new-password', '#hs-update-password-password-confirmation']} />
            </div>
            <InputError message={errors.password_confirmation} className="mt-2" />
            <div id="hs-strong-password" data-hs-strong-password={JSON.stringify(strongPasswordOptions)} className="-mx-1 mt-2 flex"></div>
          </div>
        </div>

        <PasswordRules id="hs-update-password-hints" />

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
