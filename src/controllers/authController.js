import { User } from '../models/index.js';
import { generateToken, hashPassword, comparePassword } from '../utils/auth.js';

export const register = async (req, res) => {
  try {
    const { name, email, password, role = 'client' } = req.body

    // Check if user exists
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' })
    }

    // Create user
    const hashedPassword = await hashPassword(password)
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    })

    // Generate token
    const token = generateToken(user.id, user.role)

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Find user
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Verify password
    const isValid = await comparePassword(password, user.password)
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Generate token
    const token = generateToken(user.id, user.role)

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}