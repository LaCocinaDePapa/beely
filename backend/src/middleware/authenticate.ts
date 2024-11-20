import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

// Define una interfaz para el Request autenticado
export interface AuthenticatedRequest extends Request {
  user?: { id: string, email: string }
}

const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.cookies?.access_token

  if (!token) {
    return res.status(401).json({ error: 'No se proporcionó un token de autenticación.' })
  }

  try {
    const secret = process.env.JWT_SECRET!
    const decoded = jwt.verify(token, secret) as { id: string, email: string }

    req.user = { id: decoded.id, email: decoded.email }
    next() // Si todo es correcto, continúa al siguiente middleware
  } catch (error) {
    console.error('Error de autenticación:', error)
    return res.status(403).json({ error: 'Token inválido o expirado.' })
  }
}

export default authenticate
