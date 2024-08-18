import { ToastContainer } from "react-toastify"
import { router } from "./routes/routes"
import { RouterProvider } from 'react-router-dom'

export function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer/>
    </>
  )
}
