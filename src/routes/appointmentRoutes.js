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
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         clientId:
 *           type: string
 *           format: uuid
 *         timeSlotId:
 *           type: string
 *           format: uuid
 *         status:
 *           type: string
 *           enum: [booked, completed, canceled]
 *         cancellationReason:
 *           type: string
 *           nullable: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/appointments:
 *   post:
 *     summary: Book an appointment (client only)
 *     tags: [Appointments]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Appointment booking details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               timeSlotId:
 *                 type: string
 *                 format: uuid
 *             required:
 *               - timeSlotId
 *     responses:
 *       201:
 *         description: Appointment booked successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Time slot not available
 *       403:
 *         description: Forbidden - only clients can book appointments
 *       500:
 *         description: Server error
 */
router.post('/appointments',
  authenticate,
  authorize(['client']),
  bookAppointment
)

/**
 * @swagger
 * /api/client/appointments:
 *   get:
 *     summary: Get client appointments
 *     tags: [Appointments]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of client appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 *       500:
 *         description: Server error
 */
router.get('/client/appointments',
  authenticate,
  authorize(['client']),
  getClientAppointments
)

/**
 * @swagger
 * /api/provider/appointments:
 *   get:
 *     summary: Get provider appointments
 *     tags: [Appointments]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of provider appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 *       500:
 *         description: Server error
 */
router.get('/provider/appointments',
  authenticate,
  authorize(['provider']),
  getProviderAppointments
)

/**
 * @swagger
 * /api/appointments/{appointmentId}:
 *   delete:
 *     summary: Cancel an appointment (client or provider)
 *     tags: [Appointments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         schema:
 *           type: string
 *         required: true
 *         description: Appointment ID
 *     responses:
 *       200:
 *         description: Appointment canceled successfully
 *       404:
 *         description: Appointment not found
 *       500:
 *         description: Server error
 */
router.delete('/appointments/:appointmentId',
  authenticate,
  cancelAppointment
)

export default router
