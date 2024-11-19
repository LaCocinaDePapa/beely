import AuthSesion from '../models/authModel.ts'

interface Request {
  body: { email: string; password: string };
  user?: { email: string };
  cookies?: { access_token?: string };
}

interface Response {
  status: (code: number) => {
    send: (body: any) => void;
    json: (body: any) => void;
  };
  cookie: (name: string, value: string, options: Record<string, any>) => void;
  clearCookie: (name: string) => void;
}


const validationErrors = (email: string, password: string) => {
  const errors: { [key: string]: string } = {}

  if (typeof email !== 'string' || !email.trim()) {
    errors.email = 'Email should not be empty and must be a string'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Invalid email format'
  }

  if (typeof password !== 'string' || !password.trim()) {
    errors.password = 'Password should not be empty and must be a string'
  }

  return errors
}

export const login = async (req, res) => {
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
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 120 * 120
    })

    res.status(200).send({ message: 'Login successfully' })

  }
  
  catch (error) {
    res.status(500).send({ message: 'Server error' })
  }

}

export const profile = async (req, res) => {
  const { email }: { email: string } = req.user

  if (!email) return res.status(401).json({ message: 'User not found' })

  const userProfile = await AuthSesion.profile(email)
  return res.json({ user: userProfile })
}

export const logout = async (req, res) => {
  const token = req.cookies.access_token

  if (!token) return res.json({ message: 'Session already closed' })

  res.clearCookie('access_token')
  return res.status(200).json({ message: 'Session closed' })
}
