import { Request, Response } from "express"
import UrlService from '../services/url.service'


export const shortUrl = async (req: Request, res: Response) => {

  try {
    const { originalUrl } = req.body
    const { id: ownerId } = req.user

    if (!ownerId) return res.status(400).send({ message: 'ID is required' })
    if (!originalUrl) return res.status(400).send({ message: 'Original URL is required' })

    const short = await UrlService.shortUrl(originalUrl, ownerId)

    return res.status(200).json({ result: short })
  }
  
  catch (error) {
    console.error('Error creating short URL:', error)
    return res.status(500).send({ message: 'Internal Server Error' })
  }

}

export const redirectShortUrl = async (req: Request, res: Response) => {

  try {
    const { shortCode } = req.params

    const result = await UrlService.redirectShortUrl(shortCode)

    const url = result.original_url
    if (!url) return res.status(404).send({ message: 'URL not found' })

    return res.redirect(url)
  }
  
  catch (error) {
    console.error('Error redirecting short URL:', error)
    return res.status(500).send({ message: 'Server error' })
  }

}