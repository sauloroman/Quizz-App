import React from 'react'
import { SubmitButton } from '../../../shared/components/SubmitButton'
import { useNavigate } from '../../../shared/hooks'

interface StatsEmptyStateProps {
    isDarkTheme: boolean
}

export const StatsEmptyState: React.FC<StatsEmptyStateProps> = ({ isDarkTheme }) => {
    const { goToPage } = useNavigate()

    return (
        <div className={`min-h-screen py-4`}>
            <div className="mx-auto">
                <div className="mb-8">
                    <h1 className={`text-4xl font-bold mb-2 ${isDarkTheme ? 'text-white' : 'text-slate-900'}`}>Tus Estadísticas</h1>
                    <p className={isDarkTheme ? 'text-slate-400' : 'text-slate-600'}>Revisa el historial de tus quizzes</p>
                </div>

                <div className={`flex flex-col items-center justify-center py-20 px-6 rounded-2xl border-2 ${isDarkTheme
                    ? 'bg-slate-800 border-slate-600'
                    : 'bg-white border-slate-300'
                    }`}>
                    <i className={`bxr bx-chart-bar-columns text-6xl mb-4 ${isDarkTheme ? 'text-slate-500' : 'text-slate-400'}`}></i>
                    <h3 className={`text-xl font-semibold mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-slate-600'}`}>No hay estadísticas aún</h3>
                    <p className={`text-center text-sm max-w-md ${isDarkTheme ? 'text-slate-400' : 'text-slate-500'}`}>
                        Completa tu primer quizz para generar datos aquí
                    </p>
                    <div className='w-full lg:w-56 mt-8'>
                        <SubmitButton onClick={() => goToPage('quizzes')} text='Contestar Quizz' />
                    </div>
                </div>
            </div>
        </div>
    )
}