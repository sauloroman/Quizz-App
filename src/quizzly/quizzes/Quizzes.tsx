import React from 'react'
import { useModal, useNavigate, useQuiz, useTheme } from '../../shared/hooks'
import { MainLayout } from '../../layout/MainLayout'
import { QuizzesList } from './components/QuizzesList'
import { EmptyQuizzes } from './components/EmptyQuizzes'
import { ModalNames } from '../../interfaces/ui.interface'
import { ModalConfirmDeleteQuiz } from './components/ModalConfirmDeleteQuizz'
import { SubmitButton } from '../../shared/components/SubmitButton'

export const Quizzes: React.FC = () => {
  const { quizes } = useQuiz()
  const { isDarkTheme } = useTheme()
  const { goToPage } = useNavigate()
  const { modal: { isOpen: modalIsOpen, name }} = useModal()

  return (
    <MainLayout title='Tus Creaciones'>

      <div className='flex justify-between items-center'>
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

      { modalIsOpen && name === ModalNames.confirmDeleteQuizz && <ModalConfirmDeleteQuiz />}
    </MainLayout>
  )
}