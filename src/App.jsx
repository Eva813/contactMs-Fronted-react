import { useState } from 'react'
import Home from './Pages/Home'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import router from './routes'; 
import { ToastContainer } from 'react-toastify'
import { createContext } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Contacts from './Components/Contacts'

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
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <Contacts />
      }
    ]
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
