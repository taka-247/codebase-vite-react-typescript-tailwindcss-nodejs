import { Router } from 'express'
import testRouter from './test/test'
import contactRouter from './contact/contact'

const router = Router()
router.use('/', testRouter)
router.use('/', contactRouter)

router.get('/', (_req, res) => {
  res.json({ status: 'ok' })
})

export default router