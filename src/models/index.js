import User from "./User"
import TimeSlot from "./TimeSlot"
import Appointment from "./Appointment"

//User Relationship
User.hasMany(TimeSlot, {
    foreignKey: 'providerId',
    as: 'timeSlots',
})

User.hasMany(Appointment, {
    foreignKey: 'clientId',
    as: 'clientAppointments',
})

//TimeSlot Rel
TimeSlot.belongsTo(User, {
    foreignKey: 'providerId',
    as: 'provider',
})

TimeSlot.hasOne(Appointment, {
    foreignKey: 'timeSlotId',
    as: 'appointment',
})

//Appointment Rel
Appointment.belongsTo(User, {
    foreignKey: 'clientId',
    as: 'client',
})

Appointment.belongsTo(TimeSlot, {
    foreignKey: 'timeSlotId',
    as: 'timeSlot',
})

export {
    User,
    TimeSlot,
    Appointment,
}