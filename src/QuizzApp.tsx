import React from 'react'
import { AppRoutes } from './routes/AppRoutes'
import { AlertModal } from './shared/components/AlertModal'
import { useAlert } from './shared/hooks/useAlert'

export const QuizzApp: React.FC = () => {

  const { isOpen: isAlertModalOpen } = useAlert()

  return (
    <>
      <AppRoutes />
      { isAlertModalOpen && <AlertModal /> }
    </>
  )
}
