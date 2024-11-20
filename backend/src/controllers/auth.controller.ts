import { Request, Response } from 'express'
import AuthService from '../services/auth.service.ts'


export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {

    const user = await AuthService.login(email, password)
    const { token } = user

     res
      .cookie('access_token', token, {
        httpOnly: true, // Evitar acceso desde JavaScript
        secure: process.env.NODE_ENV === 'development', // Solo HTTPS en producción
        sameSite: 'strict',
      })
      .status(200)
      .send({ message: 'Login successfull' });
  }
  
  catch (error) {
    console.error('Login error: ', error)
    res.status(500).send({ message: 'Internal Server Error' })
  }

}

export const profile = async (req: any, res: Response) => {
  const { email } = req.user

  try {
    const userProfile = await AuthService.profile(email)

    if (!userProfile) return res.status(401).json({ message: 'User not found' })

    return res.json({ user: userProfile })
  } 

  catch (error) {
    console.error('Profile error: ', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const logout = async (req: Request, res: Response) => {
  const token = req.cookies?.access_token

  if (!token) return res.json({ message: 'Session already closed' })

  res.clearCookie('access_token')
  return res.status(200).json({ message: 'Session closed' })
}
