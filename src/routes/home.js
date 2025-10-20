import express from "express"
const router = express.Router()

router.get('/', (req, res, next) => {
    res.send('Welcome to express Appointment booking sytem')
})

export default router

