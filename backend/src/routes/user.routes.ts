import express from 'express'
import { createUser } from '../controllers/user.controller.ts'

const router = express.Router()

router.post('/signup', createUser)

export default router
