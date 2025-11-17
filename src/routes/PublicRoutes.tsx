import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../auth/login/LoginPage'
import { RegisterPage } from '../auth/register/RegisterPage'

export const PublicRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='login' element={<LoginPage />} />
      <Route path='register' element={<RegisterPage />} />
      <Route path='/*' element={<Navigate to={'/auth/login'}/>} />
    </Routes>
  )
}
