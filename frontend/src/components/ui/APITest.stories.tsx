import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from 'storybook/test'
import APITest from './APITest'
import { Shared } from '@app/shared'
import { http, HttpResponse } from 'msw'

const meta: Meta<typeof APITest> = { component: APITest }
export default meta

export const Success: StoryObj<typeof APITest> = {
  parameters: {
    msw: { handlers: Shared.api.handlers },   // default success handler
  },
  // Test: show successMessage after clicking button and api successed
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: Shared.pages.dashboard.buttonText }))
    await expect(await canvas.findByText(Shared.api.test.successMessage)).toBeInTheDocument()
  },
}

export const Error: StoryObj<typeof APITest> = {
  parameters: {
    msw: {
      handlers: [
        http.get(Shared.api.test.url, () => new HttpResponse(null, { status: 500 })),
      ],
    },
  },
  // Test: show failMessage after clicking button and api failed
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: Shared.pages.dashboard.buttonText }))
    await expect(await canvas.findByText(Shared.api.test.failMessage)).toBeInTheDocument()
  },
}


// import type { Meta, StoryObj } from '@storybook/react'
// import APITest from './APITest'
// import { Shared } from '@app/shared'

// const meta: Meta<typeof APITest> = {
//   component: APITest,
// }
// export default meta

// export const Default: StoryObj<typeof APITest> = {
//   args: {},
//   parameters: {
//     msw: {
//       handlers: Shared.api.handlers
//     }
//   }
// }