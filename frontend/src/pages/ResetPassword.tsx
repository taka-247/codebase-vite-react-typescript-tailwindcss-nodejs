import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Shared } from '@app/shared'
import Field from '../components/ui/Field'
import Button from '../components/ui/Button'
import { useAuthStore } from '../store/useAuthStore'
import { useToastStore } from '../store/useToastStore'

type FormData = z.infer<typeof Shared.validation.resetPasswordSchema>

export default function ResetPassword() {
  const resetPassword = useAuthStore((state) => state.resetPassword)
  const addToast = useToastStore((state) => state.addToast)

  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(Shared.validation.resetPasswordSchema) })

  async function onSubmit(data: FormData) {
    try {
      await resetPassword(data.email)
      addToast('Check your email for a password reset link.', 'success')
    } catch (err) {
      addToast(err instanceof Error ? err.message : 'Could not send reset email', 'error')
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Reset password</h1>
      <p className="text-sm text-text mb-4">
        Enter your email and we'll send you a link to reset your password.
      </p>
      <form id="reset-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mb-4">

        <Field label="Email" error={errors.email?.message}>
          <input type="email" autoComplete="email" {...register('email')} />
        </Field>

      </form>

      <Button type="submit" form="reset-form" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send reset link'}
      </Button>

      <p className="mt-4 text-sm text-text">
        Remembered it? <Link to="/login" className="text-accent underline">Log in</Link>
      </p>
    </>
  )
}
