import React from 'react'
import type { Question } from '../../../interfaces/quizzly.interface'
import { useTheme } from '../../../shared/hooks'
import { useQuestion } from '../../../shared/hooks/useQuestion'
import { QuizzNewQuestionArea } from './QuizzNewQuestionArea'
import { QuizzEmptyQuestions } from './QuizzEmptyQuestions'

interface Props {
  questions: Question[]
}

export const QuizzListQuestions: React.FC<Props> = ({ questions }) => {
  const { isDarkTheme } = useTheme()
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
            <div
              key={question.id}
              className={`rounded-lg border transition-colors p-5 ${
                isDarkTheme
                  ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm shrink-0 ${
                  isDarkTheme
                    ? 'bg-gray-700 text-gray-300'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {index + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className={`text-base font-semibold mb-2 wrap-break-words ${
                    isDarkTheme ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                    {question.questionText}
                  </h4>

                  <div className="flex items-center gap-3 flex-wrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      isDarkTheme
                        ? 'bg-gray-700 text-gray-300'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {question.points} {question.points === 1 ? 'punto' : 'puntos'}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 shrink-0">
                  <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button className="p-2 rounded hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}