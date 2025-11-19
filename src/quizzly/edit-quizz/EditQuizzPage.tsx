import React from 'react'
import { MainLayout } from '../../layout/MainLayout'
import { useTheme } from '../../shared/hooks'
import { useQuiz } from '../../shared/hooks/useQuiz'
import { Spinner } from '../../shared/components/Spinner'
import { EditQuizzForm } from './components/EditQuizzForm'

export const EditQuizzPage: React.FC = () => {  
  const { isDarkTheme } = useTheme()
  const { isLoading } = useQuiz()
  
  return (
    <MainLayout title='Crear Nuevo Quizz'>
      <div className='min-h-screen px-4 sm:px-6 lg:px-8'>
        <div className='max-w-5xl mx-auto'>
          
          <div className='mb-12'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='w-1 h-8 bg-linear-to-b from-blue-500 to-purple-500 rounded-full'></div>
              <h1 className={`text-3xl sm:text-4xl font-bold ${
                isDarkTheme ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Editar Quizz
              </h1>
            </div>
            <p className={`text-sm sm:text-base ${
              isDarkTheme ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Cambia la información general de tu quizz
            </p>
          </div>

          <section className={`rounded-2xl border transition-all duration-300 ${
            isDarkTheme
              ? 'bg-linear-to-br from-gray-800 to-gray-900 border-gray-700 shadow-2xl shadow-gray-900/50'
              : 'bg-linear-to-br from-white to-gray-50 border-gray-200 shadow-xl shadow-gray-200/50'
          }`}>
            
            <div className={`border-b transition-colors px-8 py-6 ${
              isDarkTheme ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100 bg-gray-50/50'
            }`}>
              <div className='flex items-center gap-3'>
                <div className='w-2 h-6 bg-linear-to-b from-blue-500 to-blue-600 rounded-full'></div>
                <h3 className={`text-lg font-semibold ${
                  isDarkTheme ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  Información General
                </h3>
              </div>
            </div>

            <div className='px-8 py-8'>
              {
                isLoading
                ? (
                  <div className='flex flex-col items-center justify-center py-20 gap-4'>
                    <Spinner />
                    <p className={`text-sm ${
                      isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Cargando...
                    </p>
                  </div>
                )
                : (<EditQuizzForm />)
              }
            </div>
          </section>

          <div className={`mt-8 p-4 rounded-lg border ${
            isDarkTheme
              ? 'bg-blue-900/20 border-blue-700/50 text-blue-200'
              : 'bg-blue-50 border-blue-200 text-blue-900'
          }`}>
            <p className='text-sm'>
              💡 <span className='font-medium'>Tip:</span> Actualiza la información que ya no deseas en tu quizz para mejorar tu estudio.
            </p>
          </div>

        </div>
      </div>
    </MainLayout>
  )
}