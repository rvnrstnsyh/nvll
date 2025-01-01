import EntranceHead from '@/Components/EntranceHead'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import GuestLayout from '@/Layouts/GuestLayout'
import axios from 'axios'

import { Head, Link, useForm } from '@inertiajs/react'
import { FormEventHandler, useState } from 'react'
import { z } from 'zod'

interface Props {
  status?: string
}

type LabValidationSchema = z.infer<typeof formSchema>

const formSchema: z.ZodType = z.object({ input_alpha: z.string().min(1).trim() })

export default function Lab({ status }: Props) {
  const [processing, setProcessing] = useState<boolean>(false)
  const { data, setData, errors, setError } = useForm<LabValidationSchema>({ input_alpha: '' })

  const submit: FormEventHandler = async (event) => {
    event.preventDefault()

    const validation: z.SafeParseReturnType<typeof data, LabValidationSchema> = formSchema.safeParse(data)

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

    setProcessing(true)
    await axios
      .post(route('lab.store'), data, { headers: { 'Content-Type': 'application/json' } })
      .then((_response) => setProcessing(false))
      .catch((_error) => setProcessing(false))
  }

  return (
    <GuestLayout>
      <Head title="Laboratory" />
      <EntranceHead title="Laboratory" subtitle="Non-Violable Liberty Layers Laboratory, where testing and experimentation takes place" />
      {status && <div className="mb-4 mt-2 text-sm font-medium text-green-600">{status}</div>}
      <form onSubmit={submit} className="mt-4">
        <InputLabel htmlFor="input_alpha" value="Text Input" />
        <TextInput
          id="input_alpha"
          type="text"
          name="input_alpha"
          value={data.input_alpha}
          className="mt-1 block w-full"
          isFocused={true}
          onChange={(event) => setData('input_alpha', event.target.value)}
          placeholder="anything..."
        />
        <InputError message={errors.input_alpha} className="mt-2" />
        <div className="mt-4 flex items-center justify-end">
          <Link href={route('dashboard.create')} className="anchor-text text-sm">
            Back to dashboard
          </Link>
          <PrimaryButton className="ms-4" disabled={processing}>
            Execute
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  )
}
