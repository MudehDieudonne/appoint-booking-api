import express from "express"
import {authenticate, authorize} from '../middleware/auth.js'

import { 
  bookAppointment,
  getClientAppointments,
  getProviderAppointments,
  cancelAppointment
 } from "../controllers/appointmentController.js"

const router = express.Router()

//Client routes
router.post('/appointments',
  authenticate,
  authorize(['client']),
  bookAppointment
)

router.get('/client/appointments',
  authenticate,
  authorize(['client']),
  getClientAppointments
)

//Provider routes
router.get('/provider/appointments',
  authenticate,
  authorize(['provider']),
  getProviderAppointments
)

// Cancle routes (both client and provider)
router.delete('/appointments/:appointmentId',
  authenticate,
  cancelAppointment
)

export default router