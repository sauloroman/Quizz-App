import React from 'react'
import { QuestionHeader, AnswerOptionsList } from './'
import { getAnswerStatus } from '../../../shared/helpers/get-answer-status'
import type { QuestionWithUserAnswer } from '../../../interfaces/quizzly.interface'

interface Props {
  item: QuestionWithUserAnswer
  index: number
  isDarkTheme: boolean
}

export const QuestionCard: React.FC<Props> = ({ item, index, isDarkTheme }) => {
  const { question, userAnswer, selectedAnswer } = item
  const status = getAnswerStatus(userAnswer.isCorrect)

  return (
    <div className={`rounded-lg overflow-hidden ${isDarkTheme ? 'bg-slate-800' : 'bg-white'}`}>
      <QuestionHeader
        index={index}
        questionText={question.question.questionText}
        points={question.question.points}
        status={status}
        pointsEarned={userAnswer.pointsEarned}
        isCorrect={userAnswer.isCorrect}
        isDarkTheme={isDarkTheme}
      />

      <div className={`px-5 py-4 ${isDarkTheme ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
        <p className={`text-sm font-semibold mb-3 ${isDarkTheme ? 'text-slate-300' : 'text-slate-600'}`}>
          Opciones:
        </p>
        <AnswerOptionsList
          answers={question.answers}
          selectedAnswer={selectedAnswer}
          userAnswer={userAnswer}
          isDarkTheme={isDarkTheme}
        />
      </div>
    </div>
  )
}