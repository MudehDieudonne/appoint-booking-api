import jwt from "jsonwebtoken"
import { User } from "../models/index.js"

const JWT_SECRET = process.env.JWT_SECRET

export const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader?.startWith('Bearer')) {
            return res.statuse(401).json({error: 'Unauthorized'})
        }
        const token = authHeader.split(' ')[1]
        const decoded = jwt.verify(token, JWT_SECRET)

        const user = await User.findByPk(decoded.userId)
        if (!user) {
            return res.status(401).json({ error: 'User not found' })
        }

        req.user = {
            id: user.id,
            role: user.role
        }
        next()
    } catch (error) {
        res.status(401).json({ error: 'Invalid token'})
    }
}

export const authorize = (role = []) => {
    return (req, res, next) => {
        if (!role.includes(req.user.role)) {
            return res.status(403).json({ error: 'Forbiden' })
        }
        next()
    }
}
