import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Home from './Pages/Home'
import Register from './Pages/Register'
import Login from './Pages/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import router from './routes'; 
import { ToastContainer } from 'react-toastify'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  }
])

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ToastContainer />
    <RouterProvider router={router} />
    </>
  )
}

export default App
