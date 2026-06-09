import api from './api'
import validation from './validation'
import home from './pages/home'

const Shared = {
  api: api,
  validation: validation,
  pages: {
    home: home,
  }
} as const

export default Shared