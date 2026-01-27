import  jwt  from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const JWT_SECRET = process.env.JWT_SECRET
const SALT_ROUNDS = 10

//Generate JWT token
export const generateToken = (userId, role) => {
    return jwt.sign(
        {userId, role},
        JWT_SECRET,
        { expiresIn: '24h'}
    )
}

//Hash password
export const hashPassword = async (password) => {
    return await bcrypt.hash(password, SALT_ROUNDS)
}

//Campare password
export const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash)
}