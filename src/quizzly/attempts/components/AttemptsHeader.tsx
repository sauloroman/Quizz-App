import React from 'react'

interface HeaderProps {
  isDarkTheme: boolean
  totalAttempts: number
}

export const AttemptsHeader: React.FC<HeaderProps> = ({ isDarkTheme, totalAttempts }) => {
  return (
    <header className="mb-10">
      <h1
        className={` 
          font-bold mb-2 tracking-tight
          text-3xl md:text-4xl
          ${isDarkTheme ? 'text-white' : 'text-slate-900'}
        `}
      >
        Tus intentos
      </h1>

      <p className={`text-base md:text-lg ${isDarkTheme ? 'text-slate-400' : 'text-slate-600'}`}>
        Total de intentos:{' '}
        <span
          className={`font-semibold ${
            isDarkTheme ? 'text-white' : 'text-slate-900'
          }`}
        >
          {totalAttempts}
        </span>
      </p>
    </header>
  )
}
