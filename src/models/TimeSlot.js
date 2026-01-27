import { DataTypes } from "sequelize"
import sequelize from "../config/database.js"

const TimeSlot = sequelize.define('TimeSlot', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('available', 'booked', 'canceled'),
    defaultValue: 'available',
  },
}, {
  timestamps: true,
  indexes: [
    {
      fields: ['startTime', 'endTime'],
    },
  ],
})

export default TimeSlot