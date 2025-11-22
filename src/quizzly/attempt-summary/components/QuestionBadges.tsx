import React from 'react'
import type { AnswerStatus } from '../../../interfaces/ui.interface'

interface Props {
  points: number
  status: AnswerStatus
  pointsEarned: number
  isDarkTheme: boolean
}

export const QuestionBadges: React.FC<Props> = ({ points, status, pointsEarned, isDarkTheme }) => {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
          isDarkTheme ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-700'
        }`}
      >
        {points} {points === 1 ? 'punto' : 'puntos'}
      </span>
      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${status.bg}`}>
        <i className={`bx ${status.icon} ${status.color}`}></i>
        {status.icon === 'bx-check-circle' ? 'Correcta' : 'Incorrecta'}
      </span>
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
          isDarkTheme ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
        }`}
      >
        +{pointsEarned} pts
      </span>
    </div>
  )
}