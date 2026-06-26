import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Shared } from '@app/shared'
import Field from '../components/ui/Field'
import Button from '../components/ui/Button'
import { useAuthStore } from '../store/useAuthStore'
import { useToastStore } from '../store/useToastStore'

type FormData = z.infer<typeof Shared.validation.loginSchema>

export default function Login() {
  const navigate = useNavigate()
  const signIn = useAuthStore((state) => state.signIn)
  const addToast = useToastStore((state) => state.addToast)

  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(Shared.validation.loginSchema) })

  async function onSubmit(data: FormData) {
    try {
      await signIn(data.email, data.password)
      navigate('/', { replace: true })
    } catch (err) {
      addToast(err instanceof Error ? err.message : 'Login failed', 'error')
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Log in</h1>
      <form id="login-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mb-4">

        <Field label="Email" error={errors.email?.message}>
          <input type="email" autoComplete="email" {...register('email')} />
        </Field>

        <Field label="Password" error={errors.password?.message}>
          <input type="password" autoComplete="current-password" {...register('password')} />
        </Field>

      </form>

      <Button type="submit" form="login-form" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Log in'}
      </Button>

      <p className="mt-4 text-sm text-text">
        Don't have an account? <Link to="/signup" className="text-accent underline">Sign up</Link>
      </p>
      <p className="mt-4 text-sm text-text">
        Forgot your password? <Link to="/reset-password" className="text-accent underline">Reset password</Link>
      </p>
    </>
  )
}