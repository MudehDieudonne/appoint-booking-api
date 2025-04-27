import express from 'express'
import cors from 'cors'

const app = express()

//B middleware
app.use(cors())
app.use(express.json())

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