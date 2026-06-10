import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { http, HttpResponse } from 'msw'
import { testServer } from '../test/server'
import Home from './Home'
import Shared from '@app/shared'

describe('Home', () => {
  it('displays the message returned from the API when button is clicked', async () => {
    render(<Home />)

    await userEvent.click(screen.getByRole('button', { name: 'API Test' }))

    expect(await screen.findByText('Hello from backend!')).toBeInTheDocument()
  })

  it('displays an error when the API call fails', async () => {
    testServer.use(
      http.get(`${Shared.api.local}${Shared.api.test.url}`, () => {
        return new HttpResponse(null, { status: 500 })
      })
    )

    render(<Home />)

    await userEvent.click(screen.getByRole('button', { name: 'API Test' }))

    expect(await screen.findByText(/Error/)).toBeInTheDocument()
  })
})