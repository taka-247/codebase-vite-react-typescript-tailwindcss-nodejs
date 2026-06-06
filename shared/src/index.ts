import api from './api'
import validation from './validation'

const Shared = {
  api: api,
  validation: validation
} as const

export default Shared