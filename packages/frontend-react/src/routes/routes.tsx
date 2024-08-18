import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/app/home";
import { Login } from "../pages/auth/login";
import { Profile } from "../pages/app/profile";
import { Register } from "../pages/auth/register";
import { AuthLayout } from "../pages/_layouts/auth";
import { HomeLayout } from "../pages/_layouts/home";
import { AuthProvider } from "../context/authContext";
import PrivateRoute from "./privateroute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: 
    <AuthProvider>
      <HomeLayout />
    </AuthProvider>,
    children: [
      { path: "/",
        element: 
        <PrivateRoute>
          <Home /> 
        </PrivateRoute>
      },
      { path: "/profile", 
        element: 
        <PrivateRoute>
          <Profile /> 
        </PrivateRoute>
      }
    ]
  },
  {
    path: "/",
    element: 
      <AuthProvider>
         <AuthLayout />
      </AuthProvider>,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> }
    ]
  }
])