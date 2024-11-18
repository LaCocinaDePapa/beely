import express from 'express'
import { profile, login, logout } from '../controllers/authController.js'
import { authenticateJWT } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/profile', authenticateJWT, profile)
router.post('/signin', login)
router.post('/signout', authenticateJWT, logout)
router.get('/check-auth', authenticateJWT, profile)

export default router
