import React from 'react'
import type { QuestionWithAnswers } from '../../../interfaces/quizzly.interface'
import { useQuestion } from '../../../shared/hooks/useQuestion'
import { QuizzNewQuestionArea } from './QuizzNewQuestionArea'
import { QuizzEmptyQuestions } from './QuizzEmptyQuestions'
import { QuestionListItem } from './QuestionListItem'

interface Props {
  questions: QuestionWithAnswers[]
}

export const QuizzListQuestions: React.FC<Props> = ({ questions }) => {
  const { creatingNewQuestion } = useQuestion()
  
  return (
    <div className="space-y-4">
      
      {creatingNewQuestion && (
        <QuizzNewQuestionArea />
      )}

      {questions.length === 0 ? (
        <QuizzEmptyQuestions />
      ) : (
        <div className="space-y-4">
          {questions.map((question, index) => (
            <QuestionListItem
              key={question.question.id} 
              question={question}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  )
}