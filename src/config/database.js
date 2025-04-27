import { Sequelize } from "sequelize"
import { User, TimeSlot, Appointment } from "../models/index.js"

const sequelize = new sequelize(
    process.evn.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        logging:console.log //basic logging terminal
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