import { http, HttpResponse } from 'msw'
import Shared from '@app/shared'
 
export const handlers = [
  http.get(Shared.apiUrl, () => {
    return HttpResponse.json({ message: Shared.apiTest })
  }),
]