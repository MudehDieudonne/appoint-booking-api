import { describe, it, mock } from 'node:test'
import assert from 'node:assert'
import { hashPassword } from '../../src/utils/auth.js'

describe('Auth Utilities', () => {
  it('should hash password correctly', async () => {
    const password = 'test123'
    const hash = await hashPassword(password)
    
    assert.ok(hash)
    assert.strictEqual(typeof hash, 'string')
    assert.ok(hash.length > 50)
  })
})