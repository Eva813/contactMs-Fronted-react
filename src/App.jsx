import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Home from './Pages/Home'
import Register from './Pages/Register'
import Login from './Pages/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import router from './routes'; 
import { ToastContainer } from 'react-toastify'
import { createContext } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

export const UserContext = createContext(null)

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
  const [user, setUser] = useState(null)
  // check the auth token
  // 如：即便關掉分頁，再次打開時，也能保持登入狀態
  useEffect(() => {
    axios.get('http://127.0.0.1:3000/contactmsyt/verify', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then((res) => {
      if (res.data.success) {
        // 將會更改 user data
        setUser(res.data.user)
      }
    }).catch((error) => {
      console.log(error)
    
    })
  }, [])
  return (
    <>
    <ToastContainer />
    <UserContext.Provider value={{ user, setUser }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
    </>
  )
}

export default App
