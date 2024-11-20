import express from 'express'
import { shortUrl, redirectShortenedUrl } from '../controllers/url.controller'
import authenticate from '../middleware/authenticate'

const router = express.Router()

router.post('/shorten', authenticate, shortUrl)
router.get('/:shortCode', authenticate, redirectShortenedUrl)

export default router
