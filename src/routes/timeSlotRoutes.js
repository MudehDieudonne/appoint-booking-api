import express from "express"
import { authenticate, authorize } from "../middleware/auth.js"
import { createTimeSlot, getProviderTimeSlots, getAvailableTimeSlots } from "../controllers/timeSlotController.js"

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: TimeSlots
 *   description: Manage available time slots
 */

/**
 * @swagger
 * /api/provider/time-slots:
 *   post:
 *     summary: Create new time slot (Provider only)
 *     tags: [TimeSlots]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TimeSlot'
 *     responses:
 *       201:
 *         description: Time slot created
 *       400:
 *         description: Invalid time slot
 */

/**
 * @swagger
 * /api/time-slots/available:
 *   get:
 *     summary: Get available time slots
 *     tags: [TimeSlots]
 *     parameters:
 *       - in: query
 *         name: providerId
 *         schema:
 *           type: string
 *         description: Filter by provider ID
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date filter
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date filter
 *     responses:
 *       200:
 *         description: List of available slots
 */

//Provider ROUTES
router.post('/provider/time-slots', authenticate, authorize(['provider']), createTimeSlot)
router.get('/provider/time-slots', authenticate, authorize(['provider']), getProviderTimeSlots)

//CLient route
router.get('/time-slots/available', authenticate, getAvailableTimeSlots)

export default router