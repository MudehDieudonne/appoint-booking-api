import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const { Request, Response } = require('node-mocks-http')

export function mockRequest(options = {}) {
  return Request({
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  })
}

export function mockResponse(options = {}) {
  return Response(options)
}