import React from 'react'
import { Redirect } from 'react-router-dom'

const PrivateArea = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ? props.children : <Redirect to='/login' />
}

export default PrivateArea
