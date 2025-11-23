import React from 'react'
import type { UserProgressData } from '../../../interfaces/quizzly.interface'

interface StreaksCardsProps {
    progressData: UserProgressData
    isDarkTheme: boolean
}

export const StreaksCards: React.FC<StreaksCardsProps> = ({ progressData, isDarkTheme }) => {
    const cardBg = isDarkTheme ? 'bg-slate-800' : 'bg-white'
    const cardBorder = isDarkTheme ? 'border-slate-700' : 'border-slate-200'
    const textPrimary = isDarkTheme ? 'text-white' : 'text-slate-900'
    const textSecondary = isDarkTheme ? 'text-slate-400' : 'text-slate-600'

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`${cardBg} border ${cardBorder} rounded-lg p-6 shadow-sm`}>
                <div className="flex items-center justify-between">
                    <div>
                        <p className={`text-sm font-medium ${textSecondary}`}>Racha Actual</p>
                        <p className={`text-3xl font-bold mt-2 ${textPrimary}`}>{progressData.currentStreak || 0}</p>
                        <p className={`text-xs mt-1 ${textSecondary}`}>días consecutivos</p>
                    </div>
                    <i className={`bx bx-flame text-4xl ${isDarkTheme ? 'text-orange-400' : 'text-orange-500'}`}></i>
                </div>
            </div>

            <div className={`${cardBg} border ${cardBorder} rounded-lg p-6 shadow-sm`}>
                <div className="flex items-center justify-between">
                    <div>
                        <p className={`text-sm font-medium ${textSecondary}`}>Racha Más Larga</p>
                        <p className={`text-3xl font-bold mt-2 ${textPrimary}`}>{progressData.longestStreak || 0}</p>
                        <p className={`text-xs mt-1 ${textSecondary}`}>días consecutivos</p>
                    </div>
                    <i className={`bx bx-star text-4xl ${isDarkTheme ? 'text-yellow-400' : 'text-yellow-500'}`}></i>
                </div>
            </div>
        </div>
    )
}