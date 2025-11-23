import React from 'react'
import type { OverallStats } from '../../../interfaces/quizzly.interface'

interface OverallStatsCardsProps {
    overallStats: OverallStats
    isDarkTheme: boolean
}

export const OverallStatsCards: React.FC<OverallStatsCardsProps> = ({ overallStats, isDarkTheme }) => {
    const cardBg = isDarkTheme ? 'bg-slate-800' : 'bg-white'
    const cardBorder = isDarkTheme ? 'border-slate-700' : 'border-slate-200'
    const textPrimary = isDarkTheme ? 'text-white' : 'text-slate-900'
    const textSecondary = isDarkTheme ? 'text-slate-400' : 'text-slate-600'

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className={`${cardBg} border ${cardBorder} rounded-lg p-6 shadow-sm`}>
                <div className="flex items-center justify-between">
                    <div>
                        <p className={`text-sm font-medium ${textSecondary}`}>Intentos Totales</p>
                        <p className={`text-3xl font-bold mt-2 ${textPrimary}`}>{overallStats.totalQuestionsAnswered || 0}</p>
                    </div>
                    <i className={`bx bx-time text-4xl ${isDarkTheme ? 'text-blue-400' : 'text-blue-500'}`}></i>
                </div>
            </div>

            <div className={`${cardBg} border ${cardBorder} rounded-lg p-6 shadow-sm`}>
                <div className="flex items-center justify-between">
                    <div>
                        <p className={`text-sm font-medium ${textSecondary}`}>Promedio de Score</p>
                        <p className={`text-3xl font-bold mt-2 ${textPrimary}`}>{overallStats.overallAverageScore?.toFixed(1) || 0}%</p>
                    </div>
                    <i className={`bx bx-target text-4xl ${isDarkTheme ? 'text-green-400' : 'text-green-500'}`}></i>
                </div>
            </div>

            <div className={`${cardBg} border ${cardBorder} rounded-lg p-6 shadow-sm`}>
                <div className="flex items-center justify-between">
                    <div>
                        <p className={`text-sm font-medium ${textSecondary}`}>Quiz Completados</p>
                        <p className={`text-3xl font-bold mt-2 ${textPrimary}`}>{overallStats.totalQuizzesTaken || 0}</p>
                    </div>
                    <i className={`bx bx-trophy text-4xl ${isDarkTheme ? 'text-purple-400' : 'text-purple-500'}`}></i>
                </div>
            </div>

            <div className={`${cardBg} border ${cardBorder} rounded-lg p-6 shadow-sm`}>
                <div className="flex items-center justify-between">
                    <div>
                        <p className={`text-sm font-medium ${textSecondary}`}>Preguntas Respondidas</p>
                        <p className={`text-3xl font-bold mt-2 ${textPrimary}`}>{overallStats.totalQuestionsAnswered || 0}</p>
                    </div>
                    <i className={`bx bx-trending-up text-4xl ${isDarkTheme ? 'text-amber-400' : 'text-amber-500'}`}></i>
                </div>
            </div>
        </div>
    )
}
