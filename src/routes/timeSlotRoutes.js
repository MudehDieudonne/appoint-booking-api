import express from "express"
import { authenticate, authorize } from "../middleware/auth.js"
import { createTimeSlot, getProviderTimeSlots, getAvailableTimeSlots } from "../controllers/timeSlotController.js"

const router = express.Router()

//Provider ROUTES
router.post('/provider/time-slots', authenticate, authorize(['provider']), createTimeSlot)
router.get('/provider/time-slots', authenticate, authorize(['provider']), getProviderTimeSlots)

//CLient route
router.get('/time-slots/available', authenticate, getAvailableTimeSlots)

export default router