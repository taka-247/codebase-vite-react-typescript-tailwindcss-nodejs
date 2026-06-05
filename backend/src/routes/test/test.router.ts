import { Router } from 'express'
import Shared from '@app/shared'

const router = Router()

router.get('/', (_req, res) => {
  res.json({ message: Shared.apiTest })
})

export default router