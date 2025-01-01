import EntranceHead from '@/Components/EntranceHead'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PasswordRules from '@/Components/PasswordRules'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import TogglePassword from '@/Components/TogglePassword'
import GuestLayout from '@/Layouts/GuestLayout'

import { Head, useForm } from '@inertiajs/react'
import { FormEventHandler } from 'react'
import { z } from 'zod'

const passwordRules = z
  .string()
  .trim()
  .min(8, { message: 'Password must be at least 8 characters long.' })
  .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
  .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
  .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
  .regex(/[\W_]/, { message: 'Password must contain at least one special character.' })

const formSchema: z.ZodType = z
  .object({
    email: z.string().trim().email({ message: 'The email field is required or invalid.' }),
    password: passwordRules,
    password_confirmation: passwordRules
  })
  .refine((data) => data.password === data.password_confirmation, { message: 'Passwords do not match.', path: ['password_confirmation'] })

type ResetPasswordValidationSchema = z.infer<typeof formSchema>

export default function ResetPassword({ token, email }: { token: string; email: string }) {
  const { data, setData, post, processing, errors, reset, setError } = useForm({
    token: token,
    email: email,
    password: '',
    password_confirmation: ''
  })
  const strongPasswordOptions = {
    target: '#hs-reset-password',
    hints: '#hs-reset-password-hints',
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
  const submit: FormEventHandler = (event) => {
    event.preventDefault()
    const validation: z.SafeParseReturnType<typeof data, ResetPasswordValidationSchema> = formSchema.safeParse(data)
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
    post(route('reset-password.store'), {
      onFinish: () => reset('password', 'password_confirmation')
    })
  }

  return (
    <GuestLayout>
      <Head title="Reset Password" />
      <EntranceHead title="Reset Password" subtitle="Reset your password and regain access to your account" />
      <form onSubmit={submit} className="mt-4">
        <div>
          <InputLabel htmlFor="email" value="Email" />
          <TextInput
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full bg-gray-100"
            autoComplete="username"
            disabled
            readOnly
          />
          <InputError message={errors.email} className="mt-2" />
        </div>

        <div data-hs-toggle-password-group>
          <div className="mt-4">
            <InputLabel htmlFor="hs-reset-password" value="Password" />
            <div className="relative">
              <TextInput
                id="hs-reset-password"
                type="password"
                name="password"
                value={data.password}
                className="mt-1 block w-full"
                autoComplete="new-password"
                isFocused={true}
                onChange={(event) => setData('password', event.target.value)}
                placeholder={'*'.repeat(18)}
              />
              <TogglePassword target={['#hs-reset-password', '#hs-reset-password-confirmation']} />
            </div>
            <InputError message={errors.password} className="mt-2" />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="hs-reset-password-confirmation" value="Confirm Password" />
            <div className="relative">
              <TogglePassword target={['#hs-reset-password', '#hs-reset-password-confirmation']} />
              <TextInput
                id="hs-reset-password-confirmation"
                type="password"
                name="password_confirmation"
                value={data.password_confirmation}
                className="mt-1 block w-full"
                autoComplete="new-password"
                onChange={(event) => setData('password_confirmation', event.target.value)}
                placeholder={'*'.repeat(18)}
              />
            </div>
            <InputError message={errors.password_confirmation} className="mt-2" />
            <div id="hs-strong-password" data-hs-strong-password={JSON.stringify(strongPasswordOptions)} className="-mx-1 mt-2 flex"></div>
          </div>
        </div>
        <PasswordRules id="hs-reset-password-hints" />
        <div className="mt-4 flex items-center justify-end">
          <PrimaryButton className="ms-4" disabled={processing}>
            Reset Password
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  )
}
