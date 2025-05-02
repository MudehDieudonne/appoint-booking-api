import express from "express"
import {authenticate, authorize} from '../middleware/auth.js'

import { 
  bookAppointment,
  getClientAppointments,
  getProviderAppointments,
  cancelAppointment
 } from "../controllers/appointmentController.js"

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: Appointment management
 */

/**
 * @swagger
 * /api/appointments:
 *   post:
 *     summary: Book an appointment
 *     tags: [Appointments]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               timeSlotId:
 *                 type: string
 *             required:
 *               - timeSlotId
 *     responses:
 *       201:
 *         description: Appointment booked
 *       400:
 *         description: Time slot not available
 */

/**
 * @swagger
 * /api/appointments/{appointmentId}:
 *   delete:
 *     summary: Cancel an appointment
 *     tags: [Appointments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Appointment canceled
 *       404:
 *         description: Appointment not found
 */

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