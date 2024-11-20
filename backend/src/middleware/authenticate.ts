import { NextFunction } from 'express'
import jwt from 'jsonwebtoken'


const authenticate = (req: any, res: any, next: NextFunction) => {
  const token = req.cookies?.access_token

  if (!token) {
    return res.status(401).json({ error: 'Token not provided' })
  }

  try {
    const secret = process.env.JWT_SECRET!
    const decoded = jwt.verify(token, secret) as { id: number, email: string }

    req.user = { id: decoded.id, email: decoded.email }
    next()
  }
  
  catch (error) {
    console.error('Authenticated error:', error)
    return res.status(403).json({ error: 'Invalid or expired token.' })
  }
}

export default authenticate
