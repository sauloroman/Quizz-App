import React from 'react'
import { useAttempt } from '../../../shared/hooks'

interface Props {
    isDarkTheme: boolean
}

export const AttemptStats: React.FC<Props> = ({ isDarkTheme }) => {
    const { quizAttempt, currentQuestionNumber, questionsAttempt, counterAccumulated, onCalculateTotalPointsInQuiz } = useAttempt()
    if (!quizAttempt) return

    return (
        <>
            <div className='flex-1'>
                <p className={`text-sm font-medium mb-1 ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>PUNTUACIÓN ACTUAL</p>
                <div className='flex items-baseline gap-2'>
                    <span className={`text-3xl font-bold ${isDarkTheme ? 'text-green-400' : 'text-green-600'}`}>{counterAccumulated} / {onCalculateTotalPointsInQuiz()}</span>
                    <span className={`text-sm ${isDarkTheme ? 'text-gray-500' : 'text-gray-500'}`}> puntos </span>
                </div>
            </div>
            <div className={`h-12 hidden lg:block w-px ${isDarkTheme ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
            <div className='flex-1 flex items-center gap-10'>
                <div
                    className='w-16 h-10 rounded-full flex items-center justify-center'
                    style={{
                        backgroundColor: `${quizAttempt.color}20`,
                        borderWidth: '2px',
                        borderColor: quizAttempt.color
                    }}
                >
                    <i className='bx bx-message-question-mark text-2xl' style={{ color: quizAttempt.color }}></i>
                </div>
                <div className='w-full'>
                    <p className={`text-sm font-medium ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
                        Pregunta {currentQuestionNumber} de {questionsAttempt.length}
                    </p>
                    <div className='w-full h-1.5 bg-gray-300 rounded-full mt-2 overflow-hidden'>
                        <div
                            className='h-full w-full transition-all'
                            style={{
                                width: `${(currentQuestionNumber / questionsAttempt.length) * 100}%`,
                                backgroundColor: quizAttempt.color
                            }}
                        ></div>
                    </div>
                </div>
            </div>
        </>
    )
}
