import React, { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { PublicRoutes } from './PublicRoutes'
import { PrivateRoutes } from './PrivateRoutes'
import { useAuth } from '../shared/hooks'
import { AuthStatus } from '../interfaces/auth.interface'

export const AppRoutes: React.FC = () => {
  const { status, checkAuth } = useAuth()

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        {
          status === AuthStatus.authenticated
          ? <Route path='/*' element={<PrivateRoutes />} />
          : <Route path='auth/*' element={<PublicRoutes />} />
        }
        <Route path='*' element={<Navigate to={'/auth/login'} />} />
      </Routes>
    </BrowserRouter>
  )
}
