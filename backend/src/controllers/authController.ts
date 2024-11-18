import AuthSesion from '../models/authModel.ts'

const validationErrors = (email: string, password: string) => {
  const errors = {}

  if (typeof email !== 'string') errors.email = 'Email must be a string'
  if (email === '') errors.email = 'Email should not be empty'

  if (password === '') errors.password = 'Password must be a string'
  if (typeof password !== 'string') errors.password = 'Password must be a string'

  return errors
}

export const login = async (req: { body: { email: any; password: any } }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message?: string }): void; new(): any } }; cookie: (arg0: string, arg1: any, arg2: { httpOnly: boolean; secure: boolean; sameSite: string; maxAge: number }) => void }) => {
  const { email, password } = req.body

  const validate = validationErrors(email, password)

  if (Object.keys(validate).length > 0) return res.status(400).send(validate)

  try {

    const checkCreds = await AuthSesion.checkCredentials(email, password)
    if (!checkCreds) return res.status(400).send({ message: 'Invalid credentials' })

    const user = await AuthSesion.login(email, password)
    const { token } = user

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'development',
      sameSite: 'strict',
      maxAge: 1000 * 120 * 120
    })

    res.status(200).send({ message: 'Login successfully' })

  }
  
  catch (error) {
    res.status(500).send({ message: 'Server error' })
  }

}

export const profile = async (req: { user: { email: any } }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string }): any; new(): any } }; json: (arg0: { user: { user: { id: any; name: any; email: any }; urls: { original_url: any; shortened_url: any }[]; error?: undefined; message?: undefined } | { error: boolean; message: unknown; user?: undefined; urls?: undefined } }) => any }) => {
  const { email } = req.user

  if (!email) return res.status(401).json({ message: 'User not found' })

  const userProfile = await AuthSesion.profile(email)
  return res.json({ user: userProfile })
}

export const logout = async (req: { cookies: { access_token: any } }, res: { json: (arg0: { message: string }) => any; clearCookie: (arg0: string) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string }): any; new(): any } } }) => {
  const token = req.cookies.access_token

  if (!token) return res.json({ message: 'Session already closed' })

  res.clearCookie('access_token')
  return res.status(200).json({ message: 'Session closed' })
}
