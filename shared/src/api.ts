const api = {
    local: 'http://localhost',
    test: {
      message: 'Hello from backend!',
      url: '/api/test',
    },
    contact: {
      successMessage: 'Message received successfully!',
      url: '/api/contact',
    },
  } as const

export default api
