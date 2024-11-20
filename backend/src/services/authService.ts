import pool from './database/database.ts'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default class AuthSesion {

  static async checkCredentials (email: string, password: string) {
    try {

      const query = 'SELECT email, password FROM users WHERE email = $1'
      const result = await pool.query(query, [email])

      const user = result.rows[0]
      if (!user) {
        return user
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) return false

      return isMatch

    }
    
    catch (error) {
      return error
    }

  }

  static async login (email: string, password: string) {

    try {
      const token = jwt.sign(
        { email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1h' }
      )

      return {
        token,
        email
      }
    }

    catch (error) {
      return error
    }

  }

  static async profile(email: string) {
    try {
      const query = `
        SELECT users.id, users.name, users.email, urls.original_url, urls.shortened_url 
        FROM users 
        LEFT JOIN urls ON users.id = urls.owner_id 
        WHERE users.email = $1
      `
      const result = await pool.query(query, [email])
  
      if (result.rows.length === 0) {
        return { error: true, message: 'User not found' }
      }
  
      return {
        user: {
          id: result.rows[0].id,
          name: result.rows[0].name,
          email: result.rows[0].email,
        },
        urls: result.rows
          .filter(row => row.original_url && row.shortened_url) // Filtra URLs nulas
          .map(row => ({
            original_url: row.original_url,
            shortened_url: row.shortened_url,
          })),
      }
    } catch (error) {
      return { error: true, message: error }
    }
  }
  
}
