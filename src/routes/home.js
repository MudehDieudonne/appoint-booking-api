import express from "express"
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Welcome to express Appointment booking sytem')
})

export default router

