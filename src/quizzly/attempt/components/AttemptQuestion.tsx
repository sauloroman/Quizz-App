import React from 'react'
import { useAttempt, useTheme } from '../../../shared/hooks'
import { AttemptQuestionAnswers } from './AttemptQuestionAnswers'

export const AttemptQuestion: React.FC = () => {
    const { currentQuestion, currentQuestionNumber } = useAttempt()
    const { isDarkTheme } = useTheme()
    
    if (!currentQuestion) return

    return (
        <div className={`
            rounded-2xl border overflow-hidden 
            transition-all duration-300 w-full
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
                    <p className={`text-sm font-semibold uppercase tracking-wide mb-4 ${
                        isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                        <div className='text-2xl font-bold h-12 w-12 rounded-full border border-gray-700 flex justify-center items-center mb-2'>{currentQuestionNumber}</div> 
                        Pregunta
                    </p>
                    <p className={`text-3xl font-bold leading-relaxed ${
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