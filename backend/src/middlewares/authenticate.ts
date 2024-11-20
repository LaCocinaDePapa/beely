import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

interface authenticatedRequest extends Request {
  user?: any
}

export const authenticate = (req: authenticatedRequest, res: Response, next: NextFunction) => {
  const SECRET = process.env.JWT_SECRET || "your-secret-key"

  const authHeader = req.headers.authorization
  const token = authHeader?.split(" ")[1]

  if (!token) {
    return { error: "Unauthorized: Token not provided" }
  }

  try {
    const decoded = jwt.verify(token, SECRET)
    req.user = decoded
    next()
  }

  catch (error) {
    res.status(401).json({ message: "Invalid token" })
  }
}
