/* eslint-disable camelcase */
import User from '../services/user.service'
import { Request, Response } from 'express'


export const register = async (req: Request, res: Response) => {

  const { name, email, password } = req.body

  try {
    const user = await User.create(name, email, password)
    return res.status(201).json({ message: 'User has been create successfully', result: user })
  }
  
  catch (error) {
    return res.status(500).json({ error })
  }

}
