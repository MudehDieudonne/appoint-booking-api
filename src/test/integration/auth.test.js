import { describe, it, before, after } from 'node:test'
import assert from 'node:assert'
import sequelize from '../../config/database.js'

describe('Auth API Integration Tests', () => {
  before(async () => {
    await sequelize.sync({ force: true })
  })

  after(async () => {
    await sequelize.close()
  })

  it('should register a new user', async () => {
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      })
    })

    assert.strictEqual(response.status, 201)
    const data = await response.json()
    assert.ok(data.token)
  })
})