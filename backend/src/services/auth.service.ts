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

  static async getProfile(email: string) {
    return prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true }
    })
  }

  static async logout() {}
  
}
