import { Router } from 'express'
import Shared from '@app/shared'

const router = Router()

router.get('/', (_req, res) => {
  res.json({ message: Shared.api.test.message })
})

export default router