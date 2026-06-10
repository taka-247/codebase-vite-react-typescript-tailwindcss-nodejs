import { setupServer } from 'msw/node'
import { Shared } from '@app/shared'

export const testServer = setupServer(...Shared.api.handlers)