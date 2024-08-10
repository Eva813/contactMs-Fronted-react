import React from 'react'
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({children}) => {
  // 如果有 token ， 就 return children，否則 return 登入頁面
  const token = localStorage.getItem('token')
  return (
    <div>
      {token ? children : <Navigate to="/login" /> }
    </div>
  )
}

export default ProtectedRoutes
