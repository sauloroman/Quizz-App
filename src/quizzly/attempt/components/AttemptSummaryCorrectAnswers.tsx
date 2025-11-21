import React from 'react'
import type { QuestionWithAnswers } from '../../../interfaces/quizzly.interface'

interface Props {
    isDarkTheme: boolean
    questions: QuestionWithAnswers[]
}

export const AttemptSummaryCorrectAnswers: React.FC<Props> = ({ isDarkTheme, questions }) => {
    
    const cardClass = isDarkTheme ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    const textPrimaryClass = isDarkTheme ? 'text-white' : 'text-gray-900'
    const textSecondaryClass = isDarkTheme ? 'text-gray-400' : 'text-gray-600'

    return (
        <div className={`border ${cardClass} rounded-lg p-6`}>
            <h3 className={`text-lg font-semibold ${textPrimaryClass} mb-4`}>Respuestas correctas</h3>
            <div className="space-y-3">
                {questions.map((question, index) => {
                    const correctAnswer = question.answers.find(ans => ans.isCorrect)

                    return (
                        <div key={question.question.id} className={`border-l-4 p-4 rounded border-green-500 ${isDarkTheme ? 'bg-green-900/20' : 'bg-green-50'}`}>
                            <div className="flex items-start gap-3 mb-2">
                                <i className="bx bxs-check-circle text-green-500"></i>
                                <div className="flex-1">
                                    <p className={`font-medium ${textPrimaryClass}`}>Pregunta {index + 1}</p>
                                    <p className={`text-sm ${textSecondaryClass} mt-1`}>{question.question.questionText}</p>
                                </div>
                            </div>
                            <div className="ml-8 flex justify-between items-center">
                                <span className={`text-sm ${textSecondaryClass}`}>
                                    {correctAnswer?.answerText}
                                </span>
                                <span className={`text-xs font-semibold px-2 py-1 rounded ${isDarkTheme ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-700'}`}>
                                    Correcta
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}