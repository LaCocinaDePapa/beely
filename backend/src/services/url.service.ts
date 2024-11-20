import { nanoid } from 'nanoid'
import prisma from '../prismaService'


class UrlService {
  static async existingUrl (originalUrl: string, ownerId: number) {

    try {
      const existingUrl = await prisma.url.findFirst({
        where: { 
          originalUrl, 
          userId: ownerId
        }
      })

      return existingUrl
    }
    
    catch (error) {
      throw new Error(`Server error on check existing URL ${error}`)
    }

  }

  static async shortUrl (originalUrl: string, ownerId: number) {
    const existingUrl = await this.existingUrl(originalUrl, ownerId)

    if (existingUrl) {
      throw new Error('URL is already shortened')
    }

    const urlPattern = /^https?:\/\//
    let url = originalUrl.trim()

    if (!urlPattern) {
      url = `https://${url}`
    }

    const shortCode = nanoid(7)

    try {
      const newUrl = await prisma.url.create({
        data: {
          originalUrl: url,
          shortenedUrl: shortCode,
          userId: ownerId
        }
      })

      return newUrl
    }
    
    catch (error) {
      throw new Error(`Server error while shorting ${error}`)
    }

  }

  static async redirectShortenedUrl (shortCode: string) {

    try {
      const urlRecord = await prisma.url.findUnique({
        where: { shortenedUrl: shortCode }
      })

      if (!urlRecord) {
        throw new Error('Shortened URL not found')
      }

      return urlRecord.originalUrl
    }
    
    catch (error) {
      throw new Error(`Server error while redirecting ${error}`)
    }
    
  }
}

export default UrlService
