import express from 'express'
import { shortUrl, redirectShortUrl } from '../controllers/urlController.ts'
import { authenticateJWT } from '../middlewares/authMiddleware.ts'

const router = express.Router()

router.post('/shorten', authenticateJWT, shortUrl)
router.get('/:shortCode', authenticateJWT, redirectShortUrl)

export default router
