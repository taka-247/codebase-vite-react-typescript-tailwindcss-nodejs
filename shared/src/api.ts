import { http, HttpResponse } from 'msw'

const testMessage = 'Hello from backend!'

export const api = {
  local: 'http://localhost',
  test: {
    message: testMessage,
    url: '/api/test',
    successMessage: 'Success!',
    failMessage: 'Failed!',
  },
  contact: {
    successMessage: 'Message received successfully!',
    url: '/api/contact',
  },
  handlers: [
    http.get('/api/test', () => {
      return HttpResponse.json({ message: testMessage })
    }),
  ]
} as const