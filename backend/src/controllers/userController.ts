/* eslint-disable camelcase */
import User from '../models/userModel.js'

interface Request {
  body: { name: string, email: string, password: string }
}

interface Response {
  status: (code: number) => {
    send: (body: { message: string }) => void
    json: (body: { message: string; result?: any }) => void
  }
}

export const createUser = async (req: Request, res: Response) => {

  const { name, email, password } = req.body

  try {
    const checkUser = await User.userExists(email)

    // Check if user already exists
    if (checkUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const user = await User.create(name, email, password)
    res.status(201).json({ message: 'User has been create successfully', result: user })
  }
  
  catch (error) {
    console.error('Error creating user:', error)
    return res.status(500).send({ message: 'Server error' })
  }

}
