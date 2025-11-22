import React from 'react'

interface HeaderProps {
  isDarkTheme: boolean
  totalAttempts: number
}

export const AttemptsHeader: React.FC<HeaderProps> = ({ isDarkTheme, totalAttempts }) => {
  return (
    <div className="mb-8">
      <h1 className={`text-4xl font-bold mb-2 ${isDarkTheme ? 'text-white' : 'text-slate-900'}`}>Tus intentos</h1>
      <p className={isDarkTheme ? 'text-slate-400' : 'text-slate-600'}>
        Total de intentos: <span className={`font-semibold ${isDarkTheme ? 'text-white' : 'text-slate-900'}`}>{totalAttempts}</span>
      </p>
    </div>
  )
}