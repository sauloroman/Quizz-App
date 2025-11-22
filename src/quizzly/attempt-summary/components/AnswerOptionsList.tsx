import React from 'react'
import { AnswerOption } from './'
import type { Answer, UserAnswer } from '../../../interfaces/quizzly.interface'

interface Props {
  answers: Answer[]
  selectedAnswer: Answer | undefined
  userAnswer: UserAnswer
  isDarkTheme: boolean
}

export const AnswerOptionsList: React.FC<Props> = ({
  answers,
  selectedAnswer,
  userAnswer,
  isDarkTheme,
}) => {
  return (
    <div className="space-y-2">
      {answers.map(answer => (
        <AnswerOption
          key={answer.id}
          answer={answer}
          selectedAnswer={selectedAnswer}
          userAnswer={userAnswer}
          isDarkTheme={isDarkTheme}
        />
      ))}
    </div>
  )
}