import Url from '../models/urlModel.ts'

interface Request {
  params: { shortCode: string }
  body: { originalUrl: string }
  user: { id: string }
}

interface Response {
  status: (code: number) => {
    send: (body: { message: string }) => void
    json: (body: { message: string, result?: string }) => void
  }
  redirect: (url: string) => void
}

export const shortUrl = async (req: Request, res: Response) => {

  try {
    let { originalUrl } = req.body
    const id = req.user.id
    if (!id) return res.status(400).send({ message: 'ID is required' })
    if (!originalUrl) return res.status(400).send({ message: 'Original URL is required' })

    // Asign https:// if url has not
    const urlPattern = /^https?:\/\//
    let url = originalUrl.trim()

    if (!urlPattern.test(originalUrl)) {
      url = `https://${url}`
    }

    // Check if url has already been shortened for the user
    const existingUrl = await Url.existingUrl(url)
    if (existingUrl) return res.status(400).send({ message: 'URL has already been shortened for this user' })

    // Short url
    const short = await Url.shortUrl(url, id)

    res.status(200).json({ message: 'URL has already been shorted successfully', result: short })
  }
  
  catch (error) {
    console.error('Error creating short URL:', error)
    return res.status(500).send({ message: 'Server error' })
  }

}

export const redirectShortUrl = async (req: Request, res: Response) => {

  try {
    const { shortCode } = req.params

    const result = await Url.redirectShortUrl(shortCode)

    const url = result.original_url
    if (!url) return res.status(404).send({ message: 'URL not found' })

    return res.redirect(url)
  }
  
  catch (error) {
    console.error('Error redirecting short URL:', error)
    return res.status(500).send({ message: 'Server error' })
  }

}
