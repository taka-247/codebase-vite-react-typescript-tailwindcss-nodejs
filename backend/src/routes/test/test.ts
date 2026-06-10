import { Router } from 'express'
import { Shared } from '@app/shared'

const testRouter = Router()

testRouter.get('/test', (_req, res) => {
  res.json({ message: Shared.api.test.message })
})

export default testRouter