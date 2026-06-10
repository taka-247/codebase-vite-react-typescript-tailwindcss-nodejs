import type { Meta, StoryObj } from '@storybook/react'
import APITest from './APITest'
import { Shared } from '@app/shared'

const meta: Meta<typeof APITest> = {
  component: APITest,
}
export default meta

export const Default: StoryObj<typeof APITest> = {
  args: {},
  parameters: {
    msw: {
      handlers: Shared.api.handlers
    }
  }
}