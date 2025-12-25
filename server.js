import dotenv from 'dotenv'
dotenv.config()

import app from "./src/app.js"
import { syncDatabase } from "./src/config/database.js"

syncDatabase()

const PORT = process.env.PORT || 3000

const server = app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})

export default server
