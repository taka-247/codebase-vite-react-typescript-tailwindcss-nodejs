const Shared = {
  api: {
    local: 'http://localhost',
    test: {
      message: 'Hello from backend!',
      url: '/api/test',
    }
  }
} as const

export default Shared