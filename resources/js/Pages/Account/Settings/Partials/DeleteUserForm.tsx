import DangerButton from '@/Components/DangerButton'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import Modal from '@/Components/Modal'
import SecondaryButton from '@/Components/SecondaryButton'
import TextInput from '@/Components/TextInput'
import TogglePassword from '@/Components/TogglePassword'
import axios from 'axios'

import { useZeroTrust } from '@/Context/ZeroTrust'
import { router, useForm } from '@inertiajs/react'
import { utf8ToBytes } from '@noble/ciphers/utils'
import { FormEventHandler, useRef, useState } from 'react'
import { z } from 'zod'

interface Props {
  className?: string
}

const formSchema: z.ZodType = z.object({
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .refine((password) => /[a-z]/.test(password), { message: 'Password must contain at least one lowercase letter.' })
    .refine((password) => /[A-Z]/.test(password), { message: 'Password must contain at least one uppercase letter.' })
    .refine((password) => /[0-9]/.test(password), { message: 'Password must contain at least one number.' })
    .refine((password) => /[\W_]/.test(password), { message: 'Password must contain at least one special character.' })
})

type DeleteAccountValidationSchema = z.infer<typeof formSchema>

export default function DeleteUserForm({ className = '' }: Props): JSX.Element {
  const [processing, setProcessing] = useState<boolean>(false)
  const { Aes } = useZeroTrust()
  const [confirmUserDelete, setConfirmUserDelete] = useState<boolean>(false)
  const passwordInput = useRef<HTMLInputElement>(null)
  const { data, setData, reset, errors, clearErrors, setError } = useForm<DeleteAccountValidationSchema>({
    password: ''
  })
  const confirmUserDeletion = (): void => setConfirmUserDelete(true)
  const submit: FormEventHandler = async (event: React.FormEvent<Element>): Promise<void> => {
    event.preventDefault()
    setProcessing(true)

    const validation: z.SafeParseReturnType<typeof data, DeleteAccountValidationSchema> = formSchema.safeParse(data)
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
      return setProcessing(false)
    }

    const headers: { [key: string]: string } = { 'Content-Type': 'application/json' }
    const seal: string = await Aes.encrypt(utf8ToBytes(JSON.stringify(data)))
    await axios
      .delete(route('account-settings.destroy'), { data: { seal }, headers })
      .then((response): void => {
        if (response.status === 202) {
          reset()
          closeModal()
          setProcessing(false)
          router.visit(route('sign-in.create'), { method: 'get' })
        }
      })
      .catch((error): void => {
        if (error.response.data.errors) {
          for (const [key, value] of Object.entries(error.response.data.errors)) {
            setError(key as keyof typeof data, (value as string[])[0])
          }
          if (errors.password) {
            reset('password')
            passwordInput.current?.focus()
          }
        } else setError('password', error.response.data.message)
        setProcessing(false)
      })
  }
  const closeModal = () => {
    setConfirmUserDelete(false)
    clearErrors()
    reset()
  }

  return (
    <section className={`space-y-6 ${className}`}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">Delete Account</h2>
        <p className="mt-1 text-sm text-gray-600">
          Once your account is deleted, all of its resources and data will be permanently deleted and the username will be unusable forever. Before
          deleting your account, please download any data or information that you wish to retain.
        </p>
      </header>

      <DangerButton onClick={confirmUserDeletion}>Delete Account</DangerButton>

      <Modal show={confirmUserDelete} onClose={closeModal} maxWidth="xl">
        <form onSubmit={submit} className="p-6">
          <h2 className="text-lg font-medium text-gray-900">Are you sure you want to delete your account?</h2>
          <p className="mt-1 text-justify text-sm text-gray-600">
            Once your account is deleted, all of its resources and data will be permanently deleted and your username will no longer be available for
            reuse. Please enter your password to confirm you would like to permanently delete your account.
          </p>

          <div className="mt-6">
            <InputLabel htmlFor="hs-delete-user-password" value="Current Password" />
            <div className="relative">
              <TextInput
                id="hs-delete-user-password"
                type="password"
                name="password"
                ref={passwordInput}
                value={data.password}
                onChange={(event) => setData('password', event.target.value)}
                className="mt-1 block w-full"
                isFocused
                placeholder={'*'.repeat(18)}
              />
              <TogglePassword target={['#hs-delete-user-password']} />
            </div>
            <InputError message={errors.password} className="mt-2" />
          </div>

          <div className="mt-6 flex justify-end">
            <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
            <DangerButton className="ms-3" disabled={processing}>
              Delete Account
            </DangerButton>
          </div>
        </form>
      </Modal>
    </section>
  )
}
