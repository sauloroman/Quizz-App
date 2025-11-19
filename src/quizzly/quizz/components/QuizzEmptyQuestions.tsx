import React from 'react'
import { useTheme } from '../../../shared/hooks'
import { useQuestion } from '../../../shared/hooks/useQuestion'
import { QuizzNewQuestionArea } from './QuizzNewQuestionArea'

export const QuizzEmptyQuestions: React.FC = () => {
  const { isDarkTheme } = useTheme()
  const { creatingNewQuestion } = useQuestion()

  return (
    <>
      {
        creatingNewQuestion
          ? (<QuizzNewQuestionArea />)
          : (
            <div className={`rounded-lg border transition-colors p-12 text-center ${isDarkTheme
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
              }`}>
              <div className="flex flex-col items-center justify-center">
                <div className={`mb-4 p-4 rounded-full ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                  <svg
                    className={`w-12 h-12 ${isDarkTheme ? 'text-gray-400' : 'text-gray-400'
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                </div>

                <h3 className={`text-lg font-semibold mb-2 ${isDarkTheme ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                  Sin preguntas aún
                </h3>

                <p className={`text-sm max-w-xs ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                  Comienza a crear preguntas para tu cuestionario usando el botón "Crear pregunta"
                </p>
              </div>
            </div>
          )
      }
    </>

  )
}