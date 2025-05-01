import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRaoutes.js'
import timeSlotRoutes from './routes/timeSlotRoutes.js'

const app = express()

//Bsc middleware
app.use(cors())
app.use(express.json())

//Auth rout
app.use('/api/auth', authRoutes)

// Register time slot routes
app.use('/api', timeSlotRoutes)

//loggin mdw
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
    next()
})

//check enpoint
app.get('/health', (req, res) => {
    res.status(200).json({status: 'OK'})
})

export default app