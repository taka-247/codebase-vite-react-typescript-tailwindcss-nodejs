import { api } from './api.js'
import { validation } from './validation.js'
import { home } from './pages/home.js'

export const Shared = {
  api: api,
  validation: validation,
  pages: {
    home: home,
  }
} as const
