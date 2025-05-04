import { describe, it, mock } from 'node:test'
import assert from 'node:assert'
import { authenticate } from '../../src/middleware/auth.js'
import { mockRequest, mockResponse } from '../utils.js'
import jwt from 'jsonwebtoken'

describe('Authentication Middleware', () => {
  it('should reject requests without token', async () => {
    const req = mockRequest()
    const res = mockResponse()
    
    await authenticate(req, res, (err) => {
      assert.strictEqual(res.statusCode, 401)
    })
  })

  it('should validate proper tokens', async () => {
    const token = jwt.sign(
      { userId: 'test-id', role: 'client' },
      process.env.JWT_SECRET
    );
    
    const req = mockRequest({
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    
    const res = mockResponse()
    
    await authenticate(req, res, () => {
      assert.ok(req.user)
      assert.strictEqual(req.user.userId, 'test-id')
    })
  })
})