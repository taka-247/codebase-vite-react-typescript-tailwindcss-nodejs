import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { http, HttpResponse } from 'msw'
import { testServer } from '../test/server'
import First from './First'
import Shared from '@app/shared'

describe('First', () => {
  it('displays the message returned from the API when button is clicked', async () => {
    render(<First />)

    await userEvent.click(screen.getByRole('button', { name: 'API Test' }))

    expect(await screen.findByText(Shared.apiTest)).toBeInTheDocument()
  })

  it('displays an error when the API call fails', async () => {
    testServer.use(
      http.get(Shared.apiUrl, () => {
        return new HttpResponse(null, { status: 500 })
      })
    )

    render(<First />)

    await userEvent.click(screen.getByRole('button', { name: 'API Test' }))

    expect(await screen.findByText(/Error/)).toBeInTheDocument()
  })
})