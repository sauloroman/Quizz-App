import React from 'react'
import type { Answer } from '../../../interfaces/quizzly.interface'
import { useAttempt } from '../../../shared/hooks'
import { AttemptResult } from './AttemptResult'

interface Props {
    isDarkTheme: boolean,
    answers: Answer[]
}

export const AttemptQuestionAnswers: React.FC<Props> = ({ isDarkTheme, answers }) => {
    const { onCheckIsCorrectAnswer, quizAttempt, isResultVisible } = useAttempt()

    return (
        <>
            {
                isResultVisible 
                ? (<AttemptResult />)
                : (
                    <div className='p-8'>
                        <p className={`text-sm font-semibold uppercase tracking-wide mb-4 ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                            Opciones
                        </p>
                        <ul className='space-y-3'>
                            {answers.map((answer, index) => (
                                <li
                                    onClick={() => onCheckIsCorrectAnswer(answer.id)}
                                    key={answer.id}
                                    className={`
                                        flex items-start gap-3 p-4 rounded-lg
                                        transition-all duration-200
                                        cursor-pointer
                                        border
                                        ${isDarkTheme
                                            ? 'bg-gray-700/40 border-gray-600 text-gray-200 hover:border-opacity-100'
                                            : 'bg-gray-100 border-gray-200 text-gray-900 hover:border-opacity-100'
                                        }
                                    `}
                                    style={{
                                        backgroundColor: quizAttempt?.color ? `color-mix(in srgb, ${quizAttempt.color} 15%, ${isDarkTheme ? '#1f2937' : '#ffffff'})` : undefined,
                                    }}
                                    onMouseEnter={(e) => {
                                        if (quizAttempt?.color) {
                                            (e.currentTarget as HTMLElement).style.backgroundColor = `color-mix(in srgb, ${quizAttempt.color} 25%, ${isDarkTheme ? '#111827' : '#f3f4f6'})`
                                            ;(e.currentTarget as HTMLElement).style.borderColor = quizAttempt.color
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (quizAttempt?.color) {
                                            (e.currentTarget as HTMLElement).style.backgroundColor = `color-mix(in srgb, ${quizAttempt.color} 15%, ${isDarkTheme ? '#1f2937' : '#ffffff'})`
                                            ;(e.currentTarget as HTMLElement).style.borderColor = isDarkTheme ? '#4b5563' : '#e5e7eb'
                                        }
                                    }}
                                >
                                    <div className={`
                                        flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shrink-0
                                        transition-all duration-200
                                        ${isDarkTheme
                                            ? 'bg-gray-600 text-gray-200'
                                            : 'bg-gray-300 text-gray-700'
                                        }
                                    `}
                                    style={{
                                        backgroundColor: quizAttempt?.color ? quizAttempt.color + '40' : undefined,
                                        color: quizAttempt?.color ? quizAttempt.color : undefined,
                                    }}>
                                        {String.fromCharCode(65 + index)}
                                    </div>
                                    <span className='text-sm font-medium'>
                                        {answer.answerText}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            }
        </>
    )
}