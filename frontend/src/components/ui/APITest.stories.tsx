import type { Meta, StoryObj } from '@storybook/react'
import APITest from './APITest'
// import { handlers } from '../../test/mocks/handler'
import { http, HttpResponse } from 'msw'

const meta: Meta<typeof APITest> = {
  component: APITest,
}
export default meta

export const Default: StoryObj<typeof APITest> = {
  args: {},
  parameters: {
    msw: {
      handlers: [
        http.get('/api/test', () => {
          return HttpResponse.json({ message: 'Hello from backend!' })
        }),
      ]
    }
  }
}