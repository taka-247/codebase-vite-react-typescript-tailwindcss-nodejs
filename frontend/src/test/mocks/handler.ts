import { http, HttpResponse } from 'msw'
import Shared from '@app/shared'
 
export const handlers = [
  http.get(`${Shared.api.local}${Shared.api.test.url}`, () => {
    return HttpResponse.json({ message: Shared.api.test.message })
  }),
]