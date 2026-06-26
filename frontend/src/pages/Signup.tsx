import { Link, useNavigate } from 'react-router-dom'
import Field from '../components/ui/Field'
import Button from '../components/ui/Button'
import { useAuthStore } from '../store/useAuthStore'
import { useToastStore } from '../store/useToastStore'
import { useForm } from 'react-hook-form'
import { Shared } from '@app/shared'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

type FormData = z.infer<typeof Shared.validation.signupSchema>

export default function Signup() {
  const navigate = useNavigate()
  const signUp = useAuthStore((state) => state.signUp)
  const addToast = useToastStore((state) => state.addToast)

  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(Shared.validation.signupSchema) })

  async function onSubmit(data: FormData) {
    try {
      await signUp(data.email, data.password)
      addToast('Account created. Check your email to confirm.', 'success')
      navigate('/login', { replace: true })
    } catch (err) {
      addToast(err instanceof Error ? err.message : 'Sign up failed', 'error')
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Sign up</h1>
      <form id="signup-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mb-4">

        <Field label="Email" error={errors.email?.message}>
          <input type="email" autoComplete="email" {...register('email')} />
        </Field>

        <Field label="Password" error={errors.password?.message}>
          <input type="password" autoComplete="new-password" {...register('password')} />
        </Field>

        <Field label="Confirm password" error={errors.confirmPassword?.message}>
          <input type="password" autoComplete="new-password" {...register('confirmPassword')} />
        </Field>

      </form>

      <Button type="submit" form="signup-form" disabled={isSubmitting}>
        {isSubmitting ? 'Signing up...' : 'Sign up'}
      </Button>

      <p className="mt-4 text-sm text-text">
        Already have an account? <Link to="/login" className="text-accent underline">Log in</Link>
      </p>
    </>
  )
}
