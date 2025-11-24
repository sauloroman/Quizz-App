import React from 'react'
import { useAttempt, useTheme } from '../../../shared/hooks'
import { SubmitButton } from '../../../shared/components/SubmitButton'

export const AttemptResult: React.FC = () => {
    const { isDarkTheme } = useTheme()
    const { 
        isCorrectAnswer, 
        currentQuestion, 
        onNextQuestion, 
        currentQuestionNumber, 
        questionsAttempt, 
        onFinishQuizz 
    } = useAttempt()

    return (
        <div className={`
            animate__animated animate__bounce
            m-8 rounded-3xl border overflow-hidden 
            transition-all duration-500 backdrop-blur-sm
            ${isCorrectAnswer
                ? isDarkTheme
                    ? 'bg-green-900/20 border-green-700/60 shadow-xl shadow-green-800/40'
                    : 'bg-green-50/80 border-green-300 shadow-xl shadow-green-200/80'
                : isDarkTheme
                    ? 'bg-red-900/20 border-red-700/60 shadow-xl shadow-red-800/40'
                    : 'bg-red-50/80 border-red-300 shadow-xl shadow-red-200/80'
            }
        `}>

            <div
                className="h-1.5 w-full animate-[widthGrow_3s_linear]"
                style={{ backgroundColor: isCorrectAnswer ? '#10b981' : '#ef4444' }}
            />

            <div className="flex flex-col items-center justify-center p-10 space-y-6 text-center">

                <div className={`
                    flex items-center justify-center w-20 h-20 rounded-full shadow-md
                    transition-all duration-300
                    ${isCorrectAnswer
                        ? isDarkTheme ? 'bg-green-900/40' : 'bg-green-100'
                        : isDarkTheme ? 'bg-red-900/40' : 'bg-red-100'
                    }
                    animate-[popIn_.4s_ease-out]
                `}>
                    <i className={`
                        bx text-4xl
                        ${isCorrectAnswer ? 'bx-check-circle text-green-500' : 'bx-x-circle text-red-500'}
                    `}></i>
                </div>

                <div className="space-y-1">
                    <h3 className={`text-3xl font-extrabold tracking-wide 
                        ${isCorrectAnswer
                            ? isDarkTheme ? 'text-green-400' : 'text-green-700'
                            : isDarkTheme ? 'text-red-400' : 'text-red-700'
                        }`}>
                        {isCorrectAnswer ? '¡Correcto!' : 'Incorrecto'}
                    </h3>

                    <p className={`text-base font-medium opacity-90
                        ${isCorrectAnswer
                            ? isDarkTheme ? 'text-green-300' : 'text-green-600'
                            : isDarkTheme ? 'text-red-300' : 'text-red-600'
                        }`}>
                        {isCorrectAnswer
                            ? '✓ Excelente respuesta'
                            : '✗ Esa no era la respuesta correcta'
                        }
                    </p>

                    <p className={`text-xl font-semibold mt-2
                        ${isCorrectAnswer
                            ? isDarkTheme ? 'text-green-300' : 'text-green-600'
                            : isDarkTheme ? 'text-red-300' : 'text-red-600'
                        }`}>
                        {isCorrectAnswer
                            ? `Has obtenido +${currentQuestion?.question.points}`
                            : 'No has obtenido puntos'
                        }
                    </p>
                </div>
                
                <div className='w-fit flex justify-end'>
                    <SubmitButton
                        onClick={currentQuestionNumber === questionsAttempt.length ? onFinishQuizz : onNextQuestion} 
                        text={`${currentQuestionNumber === questionsAttempt.length ? 'Finalizar Quizz' : 'Siguiente pregunta'}`} 
                        className='text-md' 
                    />
                </div>

            </div>
        </div>
    )
}
