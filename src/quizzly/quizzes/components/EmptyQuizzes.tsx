import React from 'react'
import { Button } from '../../../shared/components/Button'
import { useNavigate } from '../../../shared/hooks'

interface Props {
  isDarkTheme: boolean
}

export const EmptyQuizzes: React.FC<Props> = ({ isDarkTheme }) => {
  const { goToPage } = useNavigate()

  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 rounded-lg ${
      isDarkTheme ? 'bg-gray-800' : 'bg-gray-50'
    }`}>
      <div className="text-center max-w-md">
        <svg
          className={`mx-auto h-24 w-24 ${isDarkTheme ? 'text-gray-600' : 'text-gray-400'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        
        <h3 className={`mt-6 text-xl font-semibold ${
          isDarkTheme ? 'text-gray-200' : 'text-gray-900'
        }`}>
          No tienes cuestionarios
        </h3>
        
        <p className={`mt-2 text-sm ${
          isDarkTheme ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Comienza creando tu primer cuestionario para organizar tus preguntas y evaluaciones.
        </p>

        <Button 
          text='Crear mi primer cuestionario'
          onClick={() => goToPage('create-quizz')}
          className={`mt-6 px-6 py-3 rounded-lg font-medium transition-colors ${
            isDarkTheme
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        />
      </div>
    </div>
  )
}