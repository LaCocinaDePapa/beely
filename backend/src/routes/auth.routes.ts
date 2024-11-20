import express from 'express'
import { profile, login, logout } from '../controllers/auth.controller.ts'
import authenticate from '../middleware/authenticate.ts'

const router = express.Router()

router.post('/signin', login)
router.get('/profile', authenticate, profile)
router.post('/signout', authenticate, logout)
router.get('/check-auth', authenticate, profile)

export default router
