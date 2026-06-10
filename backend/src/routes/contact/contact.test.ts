import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '../../app'
import { Shared } from '@app/shared'

describe(`POST ${Shared.api.contact.url}`, () => {
  it('returns 201 with a message', async () => {
    const res = await request(app)
      .post(Shared.api.contact.url)
      .send({
        name: 'Taka',
        email: 'taka@example.com',
        message: 'Hello, this is a test message.',
      })
    expect(res.status).toBe(201)
    expect(res.body).toEqual({ message: Shared.api.contact.successMessage })
  })
})