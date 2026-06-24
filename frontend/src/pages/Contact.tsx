import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import myAxios from '../api/myAxios'
import Field from '../components/ui/Field'
import Button from '../components/ui/Button'
import { Shared } from '@app/shared'
import { useToastStore } from '../store/useToastStore'

type FormData = z.infer<typeof Shared.validation.contactSchema>

export default function ContactForm() {
  const addToast = useToastStore((state) => state.addToast);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(Shared.validation.contactSchema),
  })

  async function onSubmit(data: FormData) {
    try {
      const { data: responseData } = await myAxios.post(Shared.api.contact.url, data)
      addToast(responseData.message, 'success')
      reset()
    } catch (err) {
      if (myAxios.isAxiosError(err) && err.response?.status === 400) {
        addToast(err.response.data.errorMessage, 'error')
      } else {
        addToast(err instanceof Error ? err.message : JSON.stringify(err), 'error')
      }
    }
  }

  return (
    <div className="max-w-lg mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Contact Us</h1>
      <form id='contact-form' onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mb-4">

        <Field label="Name" error={errors.name?.message}>
          <input {...register('name')} placeholder="Your name" />
        </Field>

        <Field label="Email" error={errors.email?.message}>
          <input {...register('email')} placeholder="your@email.com" />
        </Field>

        <Field label="Message" note='* Message must be at least 10 characters' error={errors.message?.message}>
          <textarea {...register('message')} rows={5} placeholder="Your message..." />
        </Field>

      </form>

      <Button
        type="submit"
        form="contact-form"
        disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Send'}</Button>
    </div>
  )
}