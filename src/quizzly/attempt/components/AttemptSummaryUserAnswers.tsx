import React from 'react'
import type { CreateUserAnswer, QuestionWithAnswers } from '../../../interfaces/quizzly.interface'

interface Props {
    isDarkTheme: boolean,
    cardClass: string,
    textPrimaryClass: string,
    textSecondaryClass: string,
    questionsAttempt: QuestionWithAnswers[]
    userAnswers: CreateUserAnswer[]
}

export const AttemptSummaryUserAnswers: React.FC<Props> = ({ isDarkTheme, cardClass, textPrimaryClass, textSecondaryClass, questionsAttempt, userAnswers }) => {
    return (
        <div className={`border ${cardClass} rounded-lg p-6`}>
            <h3 className={`text-lg font-semibold ${textPrimaryClass} mb-4`}>Detalle de respuestas</h3>
            <div className="space-y-3">
                {questionsAttempt.map((question, index) => {
                    const userAnswer = userAnswers[index]
                    const isCorrect = userAnswer?.isCorrect || false

                    return (
                        <div key={question.question.id} className={`border-l-4 p-4 rounded ${isCorrect ? (isDarkTheme ? 'border-green-500 bg-green-900/20' : 'border-green-500 bg-green-50') : (isDarkTheme ? 'border-red-500 bg-red-900/20' : 'border-red-500 bg-red-50')}`}>
                            <div className="flex items-start gap-3 mb-2">
                                {isCorrect ? (
                                    <i className="bx bxs-check-circle text-green-500"></i>
                                ) : (
                                    <i className="bx bxs-x-circle text-red-500"></i>
                                )}
                                <div className="flex-1">
                                    <p className={`font-medium ${textPrimaryClass}`}>Pregunta {index + 1}</p>
                                    <p className={`text-sm ${textSecondaryClass} mt-1`}>{question.question.questionText}</p>
                                </div>
                            </div>
                            <div className="ml-8 flex justify-between items-center">
                                <span className={`text-sm ${textSecondaryClass}`}>
                                    Puntos: {userAnswer?.pointsEarned || 0} / {question.question.points}
                                </span>
                                <span className={`text-xs font-semibold px-2 py-1 rounded ${isCorrect ? (isDarkTheme ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-700') : (isDarkTheme ? 'bg-red-900/50 text-red-300' : 'bg-red-100 text-red-700')}`}>
                                    {isCorrect ? 'Correcta' : 'Incorrecta'}
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
