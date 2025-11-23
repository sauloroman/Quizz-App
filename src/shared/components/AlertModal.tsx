import React from 'react'
import { useAlert } from '../hooks/useAlert'
import { useTheme } from '../hooks'
import { SubmitButton } from './SubmitButton'
import { AlertType } from '../../interfaces/ui.interface'
import { ModalLayout } from '../../layout/ModalLayout'

const getIcon = (type: AlertType) => {
  switch (type) {
    case AlertType.success:
      return (
        <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )
    case AlertType.error:
      return (
        <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      )
    case AlertType.warning:
      return (
        <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-yellow-100 rounded-full">
          <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
      )
    default:
      return null
  }
}

export const AlertModal: React.FC = () => {
  const { isOpen, text, title, type, closeAlert } = useAlert()
  const { isDarkTheme } = useTheme()

  return (
    <ModalLayout className='w-md' isOpen={isOpen} title={title} onClose={closeAlert}>
      <div className="text-center">
        {getIcon(type)}

        <p className={`
            mb-6 text-base
            ${isDarkTheme
              ? 'text-gray-300'
              : 'text-gray-600'
            }
          `}>
          {text}
        </p>

        <SubmitButton
          text="Aceptar"
          onClick={closeAlert}
        />
      </div>
    </ModalLayout>
  )
}