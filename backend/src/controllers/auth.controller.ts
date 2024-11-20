import AuthService from '../services/auth.service'


export const login = async (req: any, res: any) => {
  const { email, password } = req.body

  try {

    const user_token = await AuthService.login(email, password)

     res
      .cookie('access_token', user_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'development',
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

export const profile = async (req: any, res: any) => {
  const email = req.user?.email

  try {
    const userProfile = await AuthService.getProfile(email)

    return res.json({ userData: userProfile })
  } 

  catch (error) {
    console.error('Profile error: ', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const logout = async (req: any, res: any) => {
  const token = req.cookies?.access_token

  if (!token) return res.json({ message: 'Session already closed' })

  res.clearCookie('access_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'development',
    sameSite: 'strict'
  })

  return res.status(200).json({ message: 'Session closed successfully' })  
}
