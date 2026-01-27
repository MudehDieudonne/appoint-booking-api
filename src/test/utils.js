import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const httpMocks = require('node-mocks-http')

export function mockRequest(options = {}) {
  return httpMocks.createRequest({
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  })
}

export function mockResponse(options = {}) {
  return httpMocks.createResponse(options)
}