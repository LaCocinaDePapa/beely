/* eslint-disable camelcase */
import bcrypt from 'bcrypt'

class User {
  static async userExists(email: string) {

    try {

      // db request
    }
    
    catch (error) {
      return error
    }

  }

  static async create(name: string, email: string, password: string) {

    try {

      const hashedPassword = await bcrypt.hash(password, 10)
      password = hashedPassword

      // db request

    }
    
    catch (error) {
      return error
    }

  }
}

export default User
