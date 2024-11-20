import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../prismaService'

export default class AuthService {

  static async checkCredentials (email: string, password: string): Promise<boolean> {

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) return false

    const isPasswordValid = await bcrypt.compare(password, user.password)
    return isPasswordValid

  }

  static async login (email: string, password: string) {

    try {

      const checkCredentials = await this.checkCredentials(email, password)

      if (!checkCredentials) {
        throw new Error('Invalid credentials')
      }

      const user = await prisma.user.findUnique({
        where: { email }
      })

      const token = jwt.sign(
        { id: user?.id },
        process.env.JWT_SECRET_KEY!,
        { expiresIn: '1h' }
      )

      return token
    }

    catch (error) {
      throw new Error(`Internal error while login: ${error}`)
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

  static async logout() {}
  
}
