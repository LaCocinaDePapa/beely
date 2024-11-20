import express from 'express'
import { shortUrl, redirectShortenedUrl } from '../controllers/url.controller.ts'
import authenticate from '../middleware/authenticate.ts'

const router = express.Router()

router.post('/shorten', authenticate, shortUrl)
router.get('/:shortCode', authenticate, redirectShortenedUrl)

export default router
