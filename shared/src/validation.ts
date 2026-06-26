import { z } from 'zod'

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

const resetPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
})

const updatePasswordSchema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export const validation = {
  signupSchema: signupSchema,
  loginSchema: loginSchema,
  resetPasswordSchema: resetPasswordSchema,
  updatePasswordSchema: updatePasswordSchema,
  contactSchema: contactSchema,
} as const
