import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import Cookies from 'js-cookie'

interface User {
  id: string,
  name: string,
  email: string
}

interface AuthData {
  email: string,
  password: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  signin: (data: AuthData) => Promise<void>
  signup: (data: AuthData) => Promise<void>
  signout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) throw new Error('useAuth must be used within a AuthProvider')
  return context
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Reemplaza process.env por import.meta.env
  const API_URL = import.meta.env.VITE_API_URL || ''
  const API_USER_URL = import.meta.env.VITE_API_USER_URL || ''

  const signin = async (data: AuthData) => {
    try {
      const response = await fetch(`${API_URL}/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include'
      })

      const res = await response.json()

      if (response.ok) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
        throw new Error(res.message || 'Error signing in')
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const signup = async (data: AuthData) => {
    try {
      const response = await fetch(`${API_USER_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include'
      })

      const res = await response.json()

      if (response.status === 200) {
        console.log(res)
      } else {
        throw new Error(res.message || 'Error registering')
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const signout = async () => {
    const response = await fetch(`${API_URL}/signout`, {
      method: 'POST',
      credentials: 'include'
    })

    Cookies.remove('access_token')
    setIsAuthenticated(false)
    setUser(null)
    localStorage.removeItem('user')
  }

  const checkSession = async () => {
    try {
      const response = await fetch(`${API_URL}/check-auth`, {
        method: 'GET',
        credentials: 'include'
      })

      const res = await response.json()

      if (response.ok) {
        setUser(res.user.user)
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error('Error checking session:', error)
      setIsAuthenticated(false)
    }
  }

  useEffect(() => {
    checkSession()
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signin, signup, signout }}>
      {children}
    </AuthContext.Provider>
  )
}
