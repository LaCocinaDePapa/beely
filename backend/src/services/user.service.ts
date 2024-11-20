/* eslint-disable camelcase */
import bcrypt from 'bcrypt'
import prisma from '../prismaService'
import { validationErrors } from '../utils/validations.ts'

class User {
  static async existingUser(email: string) {

    try {
      // db request
      const user = await prisma.user.findUnique({
        where: { email }
      })

      return !!user // This line return true if user exists & false if not
    }
    
    catch (error) {
      throw new Error(`Error checking user existence: ${error}`)
    }

  }

  static async create(name: string, email: string, password: string) {

    try {

      const validate = validationErrors(email, password)

      if (Object.keys(validate).length > 0) {
        return validate
      }

      const existingUser = await this.existingUser(email)

      if (existingUser) {
        throw new Error('User already exists')
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      // db request
      const user = await prisma.user.create({
        data: {
          full_name: name,
          email,
          password: hashedPassword
        }
      })

      return user
    }
    
    catch (error) {
      throw new Error(`Error creating user: ${error}`)
    }

  }
}

export default User
