import sequelize from '../config/database.js'
import { Appointment, TimeSlot, User } from '../models/index.js'
import { Op } from 'sequelize'

export const bookAppointment = async (req, res) => {
    const transaction = await sequelize.transaction()
    try {
        const { timeSlotId } = req.body
        const clientId = req.user.clientId

        //Validate client role
        if (req.user.role !== 'client') {
            await transaction.rollback()
            return res.statuse(403).json({ error: 'Only clients can book appointments'})
        }

        //find available time slot
        const timeSlot = await TimeSlot.findOne({
            where: {
                id: timeSlotId,
                status: 'available'
            },
            lock: true,
            transaction
        })

        if (!timeSlot) {
            await transaction.rollback()
            return res.status(400).json({ error: 'TIme slot not available'})
        }

        //Create appointment
        const appointment = await Appointment.create({
            clientId,
            timeSlotId,
            status: 'booked'
        },{transaction})

        //Update time slot status
        await timeSlot.update({ status: 'booked'}, {transaction})
        await transaction.commit();

        res.status(201).json(appointment)
    } catch (error) {
        await transaction.rollback()
        res.status(500).json({ error: error.massage})
    }
}

export const getClientAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.findAll({
            where: { client: req.user.id },
            include: [
                {
                    model: TimeSlot,
                    as: 'timeSlot',
                    include: [{
                        model: User,
                        as: 'provider',
                        attributes: ['name', 'email']
                    }]
                }
            ],
            order: [[{model: TimeSlot, as: 'timeSlot'}, 'startTime', 'ASC']]
        })
        res.json(appointments)
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

export const getProviderAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.findAll({
            include: [{
                model: TimeSlot,
                as: 'timeSlot',
                where: {providerId: req.user.id},
                include: [{
                    model: User,
                    as:'client',
                    through: {attributes: []},
                    attributes: ['name', 'email']
                }]
            }],
            order: [[{model: TimeSlot, as: 'timeSlot'}, 'startTime', 'ASC']]
        })
        res.json(appointments)
    } catch (error) {
        res.status(500).json({error: error.massage})
    }
}

export const cancelAppointment = async (req, res) => {
    const transaction = await sequelize.transaction()
    try {
        const {appointmentId} = req.params
        const appointment = await Appointment.findAll({
            where: {
                id: appointmentId,
                [Op.or]: [
                    {clientId: req.user.id},
                    {'$timeSlote.providerId$': req.user.id}
                ]
            },
            include: [{
                model: TimeSlot,
                as: 'timeSlot'
            }],
            lock: true,
            transaction
        })

        if (!appointment) {
            await transaction.rollback()
            return res.status(404).json({error: 'Appointment not found'})
        }

        //Update appointment status
        await appointment.update({status: 'canceled'}, {transaction})

        //Free the Time slot
        await appointment.timeSlot.update({status: 'available'}, {transaction})

        await transaction.commit()
        res.json({massage: 'Appointment canceled successfully'})
    } catch (error) {
        await transaction.rollback()
        res.status(500).json({error: error.massage})
    }
}