import React from 'react'

interface Props {
  score: number
  totalPoints: number
  isDarkTheme: boolean
}

export const AttemptSummaryHeader: React.FC<Props> = ({ score, totalPoints, isDarkTheme }) => {
  return (
    <div className="mb-8">
      <h1 className={`text-4xl font-bold mb-2 ${isDarkTheme ? 'text-white' : 'text-slate-900'}`}>
        Resumen del intento
      </h1>
      <p className={isDarkTheme ? 'text-slate-400' : 'text-slate-600'}>
        Puntuación: <span className="font-semibold">{score}/{totalPoints}</span>
      </p>
    </div>
  )
}