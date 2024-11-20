import UrlService from '../services/url.service'


export const shortUrl = async (req: any, res: any) => {
    const { originalUrl } = req.body
    const ownerId = req.user?.id

    if (!ownerId) {
      return res.status(400).send({ message: 'User not authenticated' })
    }

    if (!originalUrl) {
      return res.status(400).send({ message: 'Original URL is required' })
    }

  try {
    const short = await UrlService.shortUrl(originalUrl, ownerId)

    return res.status(200).json({ result: short })
  }
  
  catch (error) {
    console.error('Error creating short URL:', error)
    return res.status(500).send({ message: 'Internal Server Error' })
  }

}

export const redirectShortenedUrl = async (req: any, res: any) => {

  try {
    const { shortCode } = req.params

    const originalUrl = await UrlService.redirectShortenedUrl(shortCode)

    return res.redirect(originalUrl)
  }
  
  catch (error) {
    console.error('Error redirecting short URL:', error)
    return res.status(500).send({ message: 'Server error' })
  }

}
