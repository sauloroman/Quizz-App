import React from 'react'
import { QuestionBadges } from './'
import type { AnswerStatus } from '../../../interfaces/ui.interface'

interface Props {
  index: number
  questionText: string
  points: number
  status: AnswerStatus
  pointsEarned: number
  isCorrect: boolean
  isDarkTheme: boolean
}

export const QuestionHeader: React.FC<Props> = ({
  index,
  questionText,
  points,
  status,
  pointsEarned,
  isCorrect,
  isDarkTheme,
}) => {
  return (
    <div className={`p-5 border-l-4 ${isCorrect ? 'border-green-500' : 'border-red-500'}`}>
      <div className="flex items-start gap-4">
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm shrink-0 ${
            isDarkTheme ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-700'
          }`}
        >
          {index + 1}
        </div>

        <div className="flex-1">
          <h3 className={`text-lg font-semibold mb-2 ${isDarkTheme ? 'text-white' : 'text-slate-900'}`}>
            {questionText}
          </h3>
          <QuestionBadges points={points} status={status} pointsEarned={pointsEarned} isDarkTheme={isDarkTheme} />
        </div>
      </div>
    </div>
  )
}