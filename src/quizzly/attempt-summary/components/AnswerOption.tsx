// AnswerOption.tsx
import React from 'react'
import type { Answer, UserAnswer } from '../../../interfaces/quizzly.interface'

interface Props {
  answer: Answer
  selectedAnswer: Answer | undefined
  userAnswer: UserAnswer
  isDarkTheme: boolean
}

export const AnswerOption: React.FC<Props> = ({ answer, selectedAnswer, userAnswer, isDarkTheme }) => {
  const isUserSelected = selectedAnswer?.id === answer.id
  const isCorrectAnswer = answer.isCorrect

  let containerClass = isDarkTheme ? 'bg-slate-800' : 'bg-white'
  let borderClass = 'border-slate-300'
  let textClass = isDarkTheme ? 'text-slate-300' : 'text-slate-700'

  if (isUserSelected) {
    if (userAnswer.isCorrect) {
      containerClass = isDarkTheme ? 'bg-green-900/20' : 'bg-green-50'
      borderClass = 'border-green-500'
      textClass = isDarkTheme ? 'text-green-200' : 'text-green-900'
    } else {
      containerClass = isDarkTheme ? 'bg-red-900/20' : 'bg-red-50'
      borderClass = 'border-red-500'
      textClass = isDarkTheme ? 'text-red-200' : 'text-red-900'
    }
  } else if (isCorrectAnswer && !userAnswer.isCorrect) {
    containerClass = isDarkTheme ? 'bg-green-900/20' : 'bg-green-50'
    borderClass = 'border-green-500'
    textClass = isDarkTheme ? 'text-green-200' : 'text-green-900'
  }

  return (
    <div className={`p-3 rounded-lg border-2 transition-colors ${containerClass} border-${borderClass}`}>
      <div className="flex items-center gap-3">
        <div>
          {isUserSelected && (
            <i
              className={`bx ${userAnswer.isCorrect ? 'bx-check-circle' : 'bx-x-circle'} text-xl ${
                userAnswer.isCorrect ? 'text-green-500' : 'text-red-500'
              }`}
            ></i>
          )}
          {isCorrectAnswer && !userAnswer.isCorrect && (
            <i className="bx bx-check-circle text-xl text-green-500"></i>
          )}
        </div>
        <div className="flex-1">
          <p className={`text-sm font-medium ${textClass}`}>{answer.answerText}</p>
          {isUserSelected && (
            <p className={`text-xs mt-1 ${isDarkTheme ? 'text-slate-400' : 'text-slate-500'}`}>
              Tu respuesta
            </p>
          )}
          {isCorrectAnswer && !userAnswer.isCorrect && (
            <p className={`text-xs mt-1 ${isDarkTheme ? 'text-green-400' : 'text-green-600'}`}>
              Respuesta correcta
            </p>
          )}
        </div>
      </div>
    </div>
  )
}