import pool from './database/database.ts'
import { nanoid } from 'nanoid'


class Url {
  static async existingUrl (originalUrl: string) {

    try {
      const query = 'SELECT * FROM urls WHERE original_url = $1'
      const result = await pool.query(query, [originalUrl])

      return result.rows[0]
    }
    
    catch (error) {
      return error
    }

  }

  static async shortUrl (originalUrl: string, id: string) {
    const shortCode = nanoid(7)

    try {
      const query = 'INSERT INTO urls (original_url, shortened_url, owner_id) VALUES ($1, $2, $3) RETURNING *'

      const values = [originalUrl, shortCode, id]

      const result = await pool.query(query, values)

      return result.rows[0]
    }
    
    catch (error) {
      return error
    }

  }

  static async redirectShortUrl (shortCode: string) {

    try {
      const query = 'SELECT original_url FROM urls WHERE shortened_url = $1'
      const result = await pool.query(query, [shortCode])

      return result.rows[0]
    }
    
    catch (error) {
      return error
    }
    
  }
}

export default Url
