import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../models/prismaService'

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

    const secret = process.env.JWT_SECRET_KEY!

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
        secret,
        { expiresIn: '1h' }
      )

      return token
    }

    catch (error) {
      throw new Error(`Internal error while login: ${error}`)
    }

  }

  static async getProfile(email: string) {
    const userProfile = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true }
    })

    if (!userProfile) {
      throw new Error('User not found')
    }

    return userProfile
  }
  
}
