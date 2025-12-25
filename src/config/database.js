import { Sequelize } from "sequelize"
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
    logging: console.log
  }
)

const createEnums = async () => {
  // Create enum types if they do not exist
  await sequelize.query(`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_users_role') THEN
        CREATE TYPE enum_users_role AS ENUM ('client', 'provider');
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_TimeSlots_status') THEN
        CREATE TYPE enum_TimeSlots_status AS ENUM ('available', 'booked', 'canceled');
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_Appointments_status') THEN
        CREATE TYPE enum_Appointments_status AS ENUM ('booked', 'completed', 'canceled');
      END IF;
    END
    $$;
  `)
}

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established')

    await createEnums();

    await sequelize.sync({ force: true })
    console.log('Database synchronised')
  } catch (error) {
    console.error('Unable to connect to database:', error)
  }
}

export { sequelize, syncDatabase }
export default sequelize
