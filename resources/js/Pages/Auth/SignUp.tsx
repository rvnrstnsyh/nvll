import Checkbox from '@/Components/Checkbox'
import EntranceHead from '@/Components/EntranceHead'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PasswordRules from '@/Components/PasswordRules'
import PrimaryButton from '@/Components/PrimaryButton'
import Stepper from '@/Components/Stepper'
import TextInput from '@/Components/TextInput'
import TogglePassword from '@/Components/TogglePassword'
import GuestLayout from '@/Layouts/GuestLayout'
import axios from 'axios'

import { useZeroTrust } from '@/Context/ZeroTrust'
import { Head, Link, router, useForm } from '@inertiajs/react'
import { utf8ToBytes } from '@noble/ciphers/utils'
import { FormEventHandler, useState } from 'react'
import { z } from 'zod'

const passwordRules: z.ZodString = z
  .string()
  .trim()
  .min(8, { message: 'Password must be at least 8 characters long.' })
  .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
  .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
  .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
  .regex(/[\W_]/, { message: 'Password must contain at least one special character.' })

const formSchema: z.ZodType = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, { message: 'Name must be at least 3 characters long.' })
      .max(255, { message: 'Name must be at most 255 characters long.' }),
    email: z.string().trim().email({ message: 'The email field is required or invalid.' }),
    password: passwordRules,
    password_confirmation: passwordRules
  })
  .refine((data) => data.password === data.password_confirmation, { message: 'Passwords do not match.', path: ['password_confirmation'] })

type SignUpValidationSchema = z.infer<typeof formSchema>

export default function SignUp() {
  const steps = [{ name: 'Account', description: 'Info' }, { name: 'Choose', description: 'Username' }, { name: 'Email Verification' }]
  const { Aes } = useZeroTrust()
  const [TaCandPP, setTaCandPP] = useState<boolean>(false) // Terms and Conditions and Privacy Policy.
  const { data, setData, processing, errors, reset, setError } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })
  const strongPasswordOptions: { [key: string]: string | number } = {
    target: '#hs-sign-up-password',
    hints: '#hs-sign-up-password-hints',
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
  const submit: FormEventHandler = async (event: React.FormEvent<Element>) => {
    event.preventDefault()

    const validation: z.SafeParseReturnType<typeof data, SignUpValidationSchema> = formSchema.safeParse(data)
    if (!validation.success) {
      // Clear previous errors that are no longer present in current validation.
      Object.keys(errors).forEach((key: string) => {
        if (!validation.error.errors.some((error) => error.path[0] === key)) setError(key as keyof typeof errors, '')
      })
      // Set new validation errors.
      validation.error.errors.forEach((error: z.ZodIssue) => {
        const key = error.path[0] as keyof typeof data
        setError(key, error.message)
      })
      return
    }

    const headers: { [key: string]: string } = { 'Content-Type': 'application/json' }
    const seal: string = await Aes.encrypt(utf8ToBytes(JSON.stringify(data)))
    await axios
      .post(route('sign-up.store'), { seal }, { headers })
      .then((response) => {
        if (response.status === 201) router.visit(route('choose-username.create'), { method: 'get' })
      })
      .catch((_error) => reset('password', 'password_confirmation'))
  }

  return (
    <GuestLayout>
      <Head title="Sign Up" />
      <EntranceHead title="SIGN UP | Account Info" subtitle="Complete your steps to create a new account" />
      <Stepper steps={steps} currentStep={0} />
      <form onSubmit={submit} className="mt-4">
        <div>
          <InputLabel htmlFor="name" value="Name (maybe a pseudonym)" />
          <TextInput
            id="name"
            name="name"
            value={data.name}
            className="mt-1 block w-full"
            autoComplete="name"
            isFocused={true}
            onChange={(event) => setData('name', event.target.value)}
            placeholder="e.g. Tokyo Hiroshima"
          />
          <InputError message={errors.name} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="email" value="Email" />
          <TextInput
            id="email"
            type="text"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            onChange={(event) => setData('email', event.target.value)}
            placeholder="e.g. chernobyl@outlook.com"
          />
          <InputError message={errors.email} className="mt-2" />
        </div>

        <div data-hs-toggle-password-group>
          <div className="mt-4">
            <InputLabel htmlFor="hs-sign-up-password" value="Password" />
            <div className="relative">
              <TextInput
                id="hs-sign-up-password"
                type="password"
                name="password"
                value={data.password}
                className="mt-1 block w-full"
                autoComplete="new-password"
                onChange={(event) => setData('password', event.target.value)}
                placeholder={'*'.repeat(18)}
              />
              <TogglePassword target={['#hs-sign-up-password', '#hs-sign-up-password-confirmation']} />
            </div>
            <InputError message={errors.password} className="mt-2" />
          </div>

          <div className="mt-4 flex">
            <div className="flex-1">
              <InputLabel htmlFor="hs-sign-up-password-confirmation" value="Confirm Password" />
              <div className="relative">
                <TextInput
                  id="hs-sign-up-password-confirmation"
                  type="password"
                  name="password_confirmation"
                  value={data.password_confirmation}
                  className="mt-1 block w-full"
                  autoComplete="new-password"
                  onChange={(event) => setData('password_confirmation', event.target.value)}
                  placeholder={'*'.repeat(18)}
                />
                <TogglePassword target={['#hs-sign-up-password', '#hs-sign-up-password-confirmation']} />
              </div>
              <InputError message={errors.password_confirmation} className="mt-2" />
              <div id="hs-strong-password" data-hs-strong-password={JSON.stringify(strongPasswordOptions)} className="-mx-1 mt-2 flex"></div>
            </div>
          </div>
        </div>
        <PasswordRules id="hs-sign-up-password-hints" />

        <div className="-mt-2 block">
          <div className="flex items-end">
            <label className="flex items-center">
              <Checkbox name="terms-and-conditions-and-privacy-policy" checked={TaCandPP} onChange={() => setTaCandPP(!TaCandPP)} />
              <span className="ms-2 mt-4 text-sm leading-3 text-gray-600">
                <a href="#" className="anchor-text">
                  Terms and Conditions
                </a>
                &nbsp;and&nbsp;
                <a href="#" className="anchor-text">
                  Privacy Policy
                </a>
                <br />
                <span className={`text-xs ${TaCandPP ? 'text-gray-400' : 'text-red-600'}`}>I have read it and agree to it</span>
              </span>
            </label>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end">
          <Link href={route('sign-in.create')} className="anchor-text text-sm">
            Already registered?
          </Link>
          <PrimaryButton className="ms-4" disabled={processing}>
            Next
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  )
}
