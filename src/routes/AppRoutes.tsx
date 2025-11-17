import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PublicRoutes } from './PublicRoutes'
import { PrivateRoutes } from './PrivateRoutes'

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='auth/*' element={<PublicRoutes />} />
        <Route path='/*' element={<PrivateRoutes />} />
      </Routes>
    </BrowserRouter>
  )
}
