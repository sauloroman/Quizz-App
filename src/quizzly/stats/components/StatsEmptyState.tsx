import React from 'react'

interface StatsEmptyStateProps {
    isDarkTheme: boolean
}

export const StatsEmptyState: React.FC<StatsEmptyStateProps> = ({ isDarkTheme }) => {
    const cardBg = isDarkTheme ? 'bg-slate-800' : 'bg-white'
    const cardBorder = isDarkTheme ? 'border-slate-700' : 'border-slate-200'
    const textSecondary = isDarkTheme ? 'text-slate-400' : 'text-slate-600'

    return (
        <div className={`${cardBg} border ${cardBorder} rounded-lg p-12 shadow-sm text-center`}>
            <i className={`bx bx-inbox text-6xl mb-4 block ${isDarkTheme ? 'text-slate-600' : 'text-slate-300'}`}></i>
            <p className={`text-lg ${textSecondary}`}>Aún no tienes estadísticas. ¡Completa algunos quiz para comenzar!</p>
        </div>
    )
}