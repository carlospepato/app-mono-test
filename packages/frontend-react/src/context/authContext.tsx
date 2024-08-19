import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { apiUrl } from "../../config/config";

interface UserData {
  id: string;
  name: string;
  email: string;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  user: UserData | null;
  login: (token: string) => void;
  logout: () => void;
  fetchUserProfile: () => Promise<void>;
  updateUser: (updatedUser: UserData) => void;
}

const PublicRoutes = ['/login', '/register'];

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserData | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isPublicRoute = PublicRoutes.includes(location.pathname);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);

    if (!token && !isPublicRoute) {
      navigate('/login', { replace: true });
    } else if (token && isPublicRoute) {
      navigate('/');
    } else if (token) {
      fetchUserProfile();
    }
  }, [isPublicRoute, navigate]);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    fetchUserProfile();
    const redirectTo = location.state?.from || '/';
    navigate(redirectTo, { replace: true });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/login', { replace: true });
  };

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`${apiUrl}/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data.');
      }

      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const updateUser = (updatedUser: UserData) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, fetchUserProfile, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
