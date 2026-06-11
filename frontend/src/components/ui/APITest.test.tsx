// Note: **.test.ts run pararelly, while test functions run sequently 
// Note: cannot use test.concurrent when using screen of testing-library-react
import { describe, test, expect } from 'vitest'
import { http, HttpResponse } from 'msw'
import { testServer } from '../../test/server'
import { Shared } from '@app/shared'
import { render, screen } from '@testing-library/react' // waitFor
import userEvent from '@testing-library/user-event'
import { composeStory } from '@storybook/react-vite'
import Meta, * as Stories from './APITest.stories'

const APITest = composeStory(Stories.Default, Meta)

describe('APITest', () => {
  test('shows success message', async () => {
    render(<APITest />)
    await userEvent.click(screen.getByRole('button', { name: Shared.pages.home.buttonText }))

    const text = await screen.findByText(Shared.api.test.successMessage)
    expect(text).toBeInTheDocument()

    // // In the case to wait some milliseconds
    // await waitFor(async () => {
    //   const text = await screen.findByText(Shared.api.test.successMessage)
    //   expect(text).toBeInTheDocument()
    // }, {
    //   timeout: 500,
    // })
  })

  test('shows error message', async () => {
    testServer.use(
      http.get(Shared.api.test.url, () => new HttpResponse(null, { status: 500 }))
    )

    render(<APITest />)
    await userEvent.click(screen.getByRole('button', { name: Shared.pages.home.buttonText }))
    expect(await screen.findByText(Shared.api.test.failMessage)).toBeInTheDocument()
  })
})