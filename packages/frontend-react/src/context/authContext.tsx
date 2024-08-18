import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

interface AuthContextProps {
  isAuthenticated: boolean
  login: (token: string) => void
  logout: () => void
}

const PublicRoutes = ['/login', '/register']; 

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const navigate = useNavigate()
  const location = useLocation()

  const isPublicRoute = PublicRoutes.includes(location.pathname);

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsAuthenticated(!!token)
    
    if (!token && !isPublicRoute) {
      navigate('/login', { replace: true })
    }else if (token && isPublicRoute){
      navigate('/')
    }
  }, [isPublicRoute, navigate])

  const login = (token: string) => {
    localStorage.setItem('token', token)
    setIsAuthenticated(true)

    const redirectTo = location.state?.from || '/'
    navigate(redirectTo, { replace: true })
  };

  const logout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    navigate('/login', { replace: true })
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
