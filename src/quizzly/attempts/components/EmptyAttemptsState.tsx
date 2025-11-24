import React from 'react'
import { MainLayout } from '../../../layout/MainLayout'

interface Props {
  isDarkTheme: boolean
}

export const EmptyAttemptsState: React.FC<Props> = ({ isDarkTheme }) => {
  return (
    <MainLayout title='Tus Intentos'>
      <div className={`min-h-screen p-6 lg:p-8`}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className={`text-4xl font-bold mb-2 ${isDarkTheme ? 'text-white' : 'text-slate-900'}`}>Tus intentos</h1>
            <p className={isDarkTheme ? 'text-slate-400' : 'text-slate-600'}>Revisa el historial de tus quizzes</p>
          </div>

          <div className={`flex flex-col items-center justify-center py-20 px-6 rounded-2xl border-2 border-dashed ${isDarkTheme 
            ? 'bg-slate-800 border-slate-600' 
            : 'bg-white border-slate-300'
          }`}>
            <i className={`bx bx-target-lock text-6xl mb-4 ${isDarkTheme ? 'text-slate-500' : 'text-slate-400'}`}></i>
            <h3 className={`text-xl font-semibold mb-2 ${isDarkTheme ? 'text-slate-300' : 'text-slate-600'}`}>No hay intentos aún</h3>
            <p className={`text-center max-w-md ${isDarkTheme ? 'text-slate-400' : 'text-slate-500'}`}>
              Completa tu primer quizz para ver tus resultados aquí
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}