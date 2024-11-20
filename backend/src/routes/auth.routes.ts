import express from 'express'
import { profile, login, logout } from '../controllers/auth.controller'
import authenticate from '../middleware/authenticate'

const router = express.Router()

router.post('/signin', login)
router.get('/profile', authenticate, profile)
router.post('/signout', logout)
router.get('/check-auth', authenticate, profile)

export default router
