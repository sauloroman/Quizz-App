import React from 'react'
import { useAttempt, useTheme } from '../../../shared/hooks'
import { AttemptQuestionAnswers } from './AttemptQuestionAnswers'

export const AttemptQuestion: React.FC = () => {
    const { currentQuestion, currentQuestionNumber } = useAttempt()
    const { isDarkTheme } = useTheme()
    
    if (!currentQuestion) return

    return (
        <div className={`
            w-[95%] mx-auto lg:w-full
            rounded-2xl border overflow-hidden 
            transition-all duration-300 
            ${isDarkTheme 
                ? 'bg-linear-to-br from-gray-800 to-gray-900 border-gray-700 shadow-2xl shadow-gray-900/50' 
                : 'bg-linear-to-br from-white to-gray-50 border-gray-200 shadow-xl shadow-gray-200/50'
            }
        `}>
            
            <div className='lg:grid lg:grid-cols-2 gap-0'>
                
                <div className={`
                    p-8 border-b lg:border-b-0 lg:border-r
                    ${isDarkTheme ? 'lg:border-gray-700 border-gray-700' : 'lg:border-gray-200 border-gray-200'}
                `}>
                    <div className='flex items-start justify-between w-full mb-6'>
                        <div className='flex items-center gap-4'>
                            <div className={`
                                flex justify-center items-center w-12 h-12 rounded-full font-bold text-lg
                                ${isDarkTheme 
                                    ? 'bg-linear-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-900/50' 
                                    : 'bg-linear-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-400/30'
                                }
                            `}>
                                {currentQuestionNumber}
                            </div>
                            <p className={`text-sm font-semibold uppercase tracking-wide ${
                                isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                                Pregunta
                            </p>
                        </div>
                        <div className={`
                            px-4 py-2 rounded-lg font-semibold flex items-center gap-2
                            ${isDarkTheme 
                                ? 'bg-amber-900/40 text-amber-300 border border-amber-700/50' 
                                : 'bg-amber-100/60 text-amber-700 border border-amber-300/50'
                            }
                        `}>
                            <span className='text-sm uppercase tracking-wide'>Pts:</span>
                            <span className='text-lg'>{currentQuestion.question.points}</span>
                        </div>
                    </div>
                    <p className={`text-xl lg:text-3xl font-bold leading-relaxed ${
                        isDarkTheme ? 'text-gray-100' : 'text-gray-900'
                    }`}>
                        {currentQuestion.question.questionText}
                    </p>
                </div>

                <AttemptQuestionAnswers isDarkTheme={isDarkTheme} answers={currentQuestion.answers}/>

            </div>
        </div>
    )
}