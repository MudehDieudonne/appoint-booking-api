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
 * components:
 *   schemas:
 *     TimeSlot:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         providerId:
 *           type: string
 *           format: uuid
 *         startTime:
 *           type: string
 *           format: date-time
 *         endTime:
 *           type: string
 *           format: date-time
 *         status:
 *           type: string
 *           enum: [available, booked]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TimeSlot'
 *       400:
 *         description: Invalid time slot
 *       403:
 *         description: Forbidden - only providers can create time slots
 *       500:
 *         description: Server error
 */
router.post('/provider/time-slots', authenticate, authorize(['provider']), createTimeSlot)

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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TimeSlot'
 *       500:
 *         description: Server error
 */
router.get('/time-slots/available', authenticate, getAvailableTimeSlots)

/**
 * @swagger
 * /api/provider/time-slots:
 *   get:
 *     summary: Get provider's time slots
 *     tags: [TimeSlots]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of provider's time slots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TimeSlot'
 *       403:
 *         description: Forbidden - only providers can access
 *       500:
 *         description: Server error
 */
router.get('/provider/time-slots', authenticate, authorize(['provider']), getProviderTimeSlots)

export default router
