import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import timeSlotRoutes from './routes/timeSlotRoutes.js'
import appointmentRoutes from './routes/appointmentRoutes.js'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './config/swagger.js'
import indexRouter from './routes/home.js'

const app = express()

//Bsc middleware
app.use(cors())
app.use(express.json())

//loggin mdw
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
  next()
})

app.use('/', indexRouter)

//Auth rout
app.use('/api/auth', authRoutes)

//appnt Routes
app.use('/api', appointmentRoutes)

// Register time slot routes
app.use('/api', timeSlotRoutes)

//swg
app.use('/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }'
  })
)

//check enpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' })
})

export default app