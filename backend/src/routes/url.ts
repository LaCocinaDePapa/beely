import express from 'express'
import { shortUrl, redirectShortUrl } from '../controllers/urlController.ts'
import { authenticate } from '../middlewares/authenticate.ts'

const router = express.Router()

router.post('/shorten', authenticate, shortUrl)
router.get('/:shortCode', authenticate, redirectShortUrl)

export default router
