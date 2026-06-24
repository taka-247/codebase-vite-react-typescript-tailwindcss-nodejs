import { api } from './api.js'
import { validation } from './validation.js'
import { dashboard } from './pages/dashboard.js'

export const Shared = {
  api: api,
  validation: validation,
  pages: {
    dashboard: dashboard,
  }
} as const
