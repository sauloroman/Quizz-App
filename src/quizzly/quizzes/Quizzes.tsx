import React from 'react'
import { useNavigate, useQuiz, useTheme } from '../../shared/hooks'
import { MainLayout } from '../../layout/MainLayout'
import { QuizzesList } from './components/QuizzesList'
import { EmptyQuizzes } from './components/EmptyQuizzes'
import { SubmitButton } from '../../shared/components/SubmitButton'

export const Quizzes: React.FC = () => {
  const { quizes } = useQuiz()
  const { isDarkTheme } = useTheme()
  const { goToPage } = useNavigate()

  return (
    <MainLayout title='Tus Creaciones'>

      <div className='w-full flex flex-col lg:flex-row mb-5 justify-between items-center'>
        <div className="mb-6">
          <h1 className={`text-3xl font-bold ${
            isDarkTheme ? 'text-gray-100' : 'text-gray-900'
          }`}>
            Tus Creaciones
          </h1>
          <p className={`mt-2 text-sm ${
            isDarkTheme ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Cuestionarios creados y realizados
          </p>
        </div>
        <div className='w-40'>
          <SubmitButton 
            onClick={() => goToPage('create-quizz')}
            text='+ Nuevo Quizz'
          />
        </div>
      </div>

      {quizes.length === 0 ? (
        <EmptyQuizzes isDarkTheme={isDarkTheme} />
      ) : (
        <QuizzesList quizzes={quizes} />
      )}

    </MainLayout>
  )
}