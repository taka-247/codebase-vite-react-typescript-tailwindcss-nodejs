import { z } from 'zod'

const signupSchema = z.object({
  userName: z.string().min(1, 'User name is required'),
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

const profileSchema = z.object({
  display_name: z.string().min(1, 'Display name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  // read-only fields — present so the form type matches, not user-validated
  role: z.string(),
  created_at: z.string(),
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
  profileSchema: profileSchema,
  contactSchema: contactSchema,
} as const
