// Note: ToastMessage cannot be detected as it is outside of Home while home.spec.ts can - see there
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { http, HttpResponse } from 'msw'
import { testServer } from '../../test/server'
import { Shared } from '@app/shared'
import APITest from './APITest'

describe('APITest', () => {
  it('Test if successMessage is shown when button is clicked', async () => {
    render(<APITest />)

    await userEvent.click(screen.getByRole('button', { name: Shared.pages.home.buttonText }))

    expect(await screen.findByText(Shared.api.test.successMessage)).toBeInTheDocument()
  })

  it('Test if failMessage is shown when button is clicked', async () => {
    // Overwrite handler
    testServer.use(
      http.get(Shared.api.test.url, () => {
        return new HttpResponse(null, { status: 500 })
      })
    )

    render(<APITest />)

    await userEvent.click(screen.getByRole('button', { name: Shared.pages.home.buttonText }))

    expect(await screen.findByText(Shared.api.test.failMessage)).toBeInTheDocument()

    testServer.resetHandlers()
  })
})