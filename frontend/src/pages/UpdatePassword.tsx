import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Shared } from '@app/shared'
import Field from '../components/ui/Field'
import Button from '../components/ui/Button'
import { useAuthStore } from '../store/useAuthStore'
import { useToastStore } from '../store/useToastStore'

type FormData = z.infer<typeof Shared.validation.updatePasswordSchema>

export default function UpdatePassword() {
  const navigate = useNavigate()
  const updatePassword = useAuthStore((state) => state.updatePassword)
  const addToast = useToastStore((state) => state.addToast)

  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(Shared.validation.updatePasswordSchema) })

  async function onSubmit(data: FormData) {
    try {
      await updatePassword(data.password)
      addToast('Password updated. You can now log in.', 'success')
      navigate('/', { replace: true })
    } catch (err) {
      addToast(err instanceof Error ? err.message : 'Could not update password', 'error')
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Set a new password</h1>
      <form id="update-password-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mb-4">

        <Field label="New password" error={errors.password?.message}>
          <input type="password" autoComplete="new-password" {...register('password')} />
        </Field>

        <Field label="Confirm password" error={errors.confirmPassword?.message}>
          <input type="password" autoComplete="new-password" {...register('confirmPassword')} />
        </Field>

      </form>

      <Button type="submit" form="update-password-form" disabled={isSubmitting}>
        {isSubmitting ? 'Updating...' : 'Update password'}
      </Button>
    </>
  )
}
