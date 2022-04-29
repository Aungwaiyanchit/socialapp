import React, { useContext } from 'react'
import { Route, Navigate, useLocation} from 'react-router-dom'
import { useSelector } from 'react-redux'


export const PrivateRoute = ({ children }) => {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  return isAuthenticated ? children : <Navigate to='/login'/>
}
