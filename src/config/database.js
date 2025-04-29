import { Sequelize } from "sequelize"
import { User, TimeSlot, Appointment } from "../models/index.js"
import dotenv from 'dotenv'

dotenv.config()

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        dialectOptions: {
          ssl: false
        },
        logging: console.log // Enable temporarily for debugging
    }
)

const syncDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established')

        await sequelize.sync({ force: true })
        console.log('Database synchronised')
    } catch (error) {
        console.error('Unable to connect to database:', error)
    }
}

syncDatabase()

export default sequelize