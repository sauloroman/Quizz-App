import React from 'react'
import type { QuizStats } from '../../../interfaces/quizzly.interface'

interface QuizStatsTableProps {
    quizStats: QuizStats[]
    isDarkTheme: boolean
}

export const QuizStatsTable: React.FC<QuizStatsTableProps> = ({ quizStats, isDarkTheme }) => {
    const cardBg = isDarkTheme ? 'bg-slate-800' : 'bg-white'
    const cardBorder = isDarkTheme ? 'border-slate-700' : 'border-slate-200'
    const textPrimary = isDarkTheme ? 'text-white' : 'text-slate-900'
    const textSecondary = isDarkTheme ? 'text-slate-400' : 'text-slate-600'

    if (!quizStats || quizStats.length === 0) {
        return null
    }

    return (
        <div className={`${cardBg} border ${cardBorder} rounded-lg p-6 shadow-sm`}>
            <div className="flex items-center gap-2 mb-4">
                <i className={`bx bx-bar-chart text-2xl ${isDarkTheme ? 'text-purple-400' : 'text-purple-500'}`}></i>
                <h3 className={`text-lg font-semibold ${textPrimary}`}>Estadísticas por Quiz</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className={`border-b ${isDarkTheme ? 'border-slate-700' : 'border-slate-200'}`}>
                            <th className={`text-left py-3 px-4 font-semibold ${textSecondary}`}>Quiz ID</th>
                            <th className={`text-center py-3 px-4 font-semibold ${textSecondary}`}>
                                <i className="bx bx-repeat inline mr-1"></i>Intentos
                            </th>
                            <th className={`text-center py-3 px-4 font-semibold ${textSecondary}`}>
                                <i className="bx bx-star inline mr-1"></i>Mejor Score
                            </th>
                            <th className={`text-center py-3 px-4 font-semibold ${textSecondary}`}>
                                <i className="bx bx-chart inline mr-1"></i>Promedio
                            </th>
                            <th className={`text-center py-3 px-4 font-semibold ${textSecondary}`}>
                                <i className="bx bx-check-circle inline mr-1"></i>Correctas
                            </th>
                            <th className={`text-center py-3 px-4 font-semibold ${textSecondary}`}>
                                <i className="bx bx-x-circle inline mr-1"></i>Incorrectas
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {quizStats.map((quiz, idx) => (
                            <tr 
                                key={idx}
                                className={`border-b ${isDarkTheme ? 'border-slate-700 hover:bg-slate-700/30' : 'border-slate-200 hover:bg-slate-50'}`}
                            >
                                <td className={`py-3 px-4 ${textPrimary} font-medium`}>{quiz.quizId}</td>
                                <td className={`text-center py-3 px-4 ${textSecondary}`}>{quiz.totalAttempts || 0}</td>
                                <td className={`text-center py-3 px-4 font-semibold ${isDarkTheme ? 'text-green-400' : 'text-green-600'}`}>
                                    {quiz.bestScore?.toFixed(1) || 0}%
                                </td>
                                <td className={`text-center py-3 px-4 font-semibold ${textPrimary}`}>
                                    {quiz.averageScore?.toFixed(1) || 0}%
                                </td>
                                <td className={`text-center py-3 px-4 font-semibold text-green-500`}>{quiz.totalCorrectAnswers || 0}</td>
                                <td className={`text-center py-3 px-4 font-semibold text-red-500`}>{quiz.totalIncorrectAnswers || 0}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}