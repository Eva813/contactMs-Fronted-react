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
import AddContact from './Components/AddContact'
import EditContact from './Components/EditContact'
import Logout from './Components/Logout'
import ProtectedRoutes from './Components/ProtectedRoutes'
import NotFound from './Pages/NotFound'

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
    element: <ProtectedRoutes><Dashboard /></ProtectedRoutes>,
    children: [
      {
        index: true,
        element: <Contacts />
      },
      {
        path: '/dashboard/add-contact',
        element: <AddContact />
      },
      {
        path: '/dashboard/edit-contact/:id',
        element: <EditContact />
      }
    ]
  },
  {
    path: '/logout',
    element: <Logout />
  },
  {
    path: '*',
    element: <NotFound />
  }
])

function App() {
  const [user, setUser] = useState(null)
  // check the auth token
  // 如：即便關掉分頁，再次打開時，也能保持登入狀態
  useEffect(() => {
    axios.get(`${import.meta.env.REACT_APP_API_URL}/contactmsyt/verify`, {
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
