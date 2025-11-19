import React from 'react'
import type { Answer } from '../../../interfaces/quizzly.interface'

interface Props {
    isDarkTheme: boolean,
    isOpen: boolean,
    answers: Answer[]
}

export const QuestionAccordion: React.FC<Props> = ({ isDarkTheme, isOpen, answers }) => {
    return (
        <>
            {isOpen && (
                <div className={`border-t transition-all ${isDarkTheme ? 'border-gray-700 bg-gray-700/50' : 'border-gray-200 bg-gray-50'}`}>
                    <div className="p-5">
                        <div className="space-y-3">
                            <h5 className={`text-sm font-semibold ${isDarkTheme ? 'text-gray-200' : 'text-gray-800'}`}>
                                Opciones ({answers.length})
                            </h5>

                            <div className="space-y-2">
                                {answers.map((answer, answerIndex) => (
                                    <div
                                        key={answer.id}
                                        className={`flex items-start gap-3 p-3 rounded ${answer.isCorrect
                                                ? isDarkTheme
                                                    ? 'bg-green-900/30 border border-green-700'
                                                    : 'bg-green-50 border border-green-200'
                                                : isDarkTheme
                                                    ? 'bg-gray-800 border border-gray-600'
                                                    : 'bg-white border border-gray-200'
                                            }`}
                                    >
                                        <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium shrink-0 ${answer.isCorrect
                                                ? isDarkTheme
                                                    ? 'bg-green-700 text-white'
                                                    : 'bg-green-500 text-white'
                                                : isDarkTheme
                                                    ? 'bg-gray-600 text-gray-300'
                                                    : 'bg-gray-200 text-gray-600'
                                            }`}>
                                            {String.fromCharCode(65 + answerIndex)}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <p className={`text-sm wrap-break-words ${isDarkTheme ? 'text-gray-100' : 'text-gray-800'}`}>
                                                {answer.answerText}
                                            </p>
                                        </div>

                                        {answer.isCorrect && (
                                            <div className="flex items-center gap-1 shrink-0">
                                                <i className={`bx bx-check-circle text-lg ${isDarkTheme ? 'text-green-400' : 'text-green-600'}`}></i>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
