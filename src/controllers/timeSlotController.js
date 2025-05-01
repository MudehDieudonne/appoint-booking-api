import { TimeSlot, User } from "../models/index.js"
import { Op } from "sequelize"

export const createTimeSlot = async (req, res) => {
    try{
        const { startTime, endTime } = req.body
        const providerId = req.user.id
        //Validate provider role
        if(req.user.role !== 'provider') {
            return res.status(403).json({ error: 'Only providers can create time slots'})
        }

        //Basic validation
        if (!startTime || !endTime) {
            return res.status(400).json({ error: 'Missing required fields'})
        }

        if (new Date(startTime) >= new Date(endTime)) {
            return res.status(400).json({ error: 'End time must be after start time'})
        }

        //CHECK FOR OVERLAPPING SLOTS
        const existingSlot = await TimeSlot.findOne({
            where: {
                providerId,
                [Op.and]: [
                    { startTime: { [Op.lt]: endTime } },
                    { endTime: { [Op.gt]: startTime } }
                ]
            }
        })

        if (existingSlot) {
            return res.status(400).json({ error: 'Time slot overlaps with existing slot'})
        }

        const timeSlot = await TimeSlot.create({
            startTime,
            endTime,
            providerId,
            status: 'available'
        })

        res.status(201).json(timeSlot)
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

export const getProviderTimeSlots = async (req, res) => {
    try {
        const timeSlots = await TimeSlot.findAll({
            where: { providerId: req.user.id },
            order: [['startTime', 'ASC']]
        })
        res.json(timeSlots)
    } catch (error) {
        res.status(500).json({ error: error.massage })
    }
}

export const getAvailableTimeSlots = async (req, res) => {
    try {
        const { providerId, startDate, endDate } = req.query

        const whereClause = {
            status: 'available',
            ...(providerId && { providerId }),
            startTime: {
                [Op.gte]: startDate || new Date()
            }
        }

        if (endDate) {
            whereClause.endTime = { [Op.lte]: endDate}
        }

        const timeSlots = await TimeSlot.findAll({
            where: whereClause,
            include: [{
                model: User,
                as: 'provider',
                attributes: [['id', 'name']]
            }],
            order: [['startTime', 'ASC']]
        })

        res.json(timeSlots)
    } catch (error) {
        res.status(500).json({ error: error.massage})
    }
}