import React from 'react'
import { Navigate } from 'react-router-dom'

const UnloggedRoute = ({ children }) => {
  const session = JSON.parse(localStorage.getItem('session'));
  
  return session !== null ? <Navigate to='/home'/> : children
}

export default UnloggedRoute