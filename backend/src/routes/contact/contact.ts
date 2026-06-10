import { Shared } from '@app/shared'
import { Router } from 'express'

const contactRouter = Router()

contactRouter.post('/contact', (req, res) => {
  const result = Shared.validation.contactSchema.safeParse(req.body)

  if (!result.success) {
    const errorMessage = result.error.issues.map((issue: { message: string }) => issue.message).join(', ')
    res.status(400).json({ errorMessage: errorMessage })
    return
  }

  const { name, email, message } = result.data

  console.log('Contact form received:', { name, email, message })

  // Note: send email, save to DB, etc here.

  res.status(201).json({ message: Shared.api.contact.successMessage })
})

export default contactRouter