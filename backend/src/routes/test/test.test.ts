import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '../../app'
import { Shared } from '@app/shared'

describe(`GET ${Shared.api.test.url}`, () => {
  it('returns 200 with a message', async () => {
    const res = await request(app).get(Shared.api.test.url)
    expect(res.status).toBe(200)
    expect(res.body).toEqual({ message: Shared.api.test.message })
  })

  it('returns JSON content-type', async () => {
    const res = await request(app).get(Shared.api.test.url)
    expect(res.headers['content-type']).toMatch(/json/)
  })
})