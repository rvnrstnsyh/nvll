import DangerButton from '@/Components/DangerButton'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import Modal from '@/Components/Modal'
import SecondaryButton from '@/Components/SecondaryButton'
import TextInput from '@/Components/TextInput'
import TogglePassword from '@/Components/TogglePassword'

import { useForm } from '@inertiajs/react'
import { FormEventHandler, useRef, useState } from 'react'
import { z } from 'zod'

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

export default function DeleteUserForm({ className = '' }: { className?: string }) {
  const [confirmUserDelete, setConfirmUserDelete] = useState(false)
  const passwordInput = useRef<HTMLInputElement>(null)
  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
    clearErrors,
    setError
  } = useForm({
    password: ''
  })

  const confirmUserDeletion = () => setConfirmUserDelete(true)

  const deleteUser: FormEventHandler = (event) => {
    event.preventDefault()
    const validation: z.SafeParseReturnType<typeof data, DeleteAccountValidationSchema> = formSchema.safeParse(data)
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
    destroy(route('account-settings.destroy'), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordInput.current?.focus(),
      onFinish: () => reset()
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
        <form onSubmit={deleteUser} className="p-6">
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
