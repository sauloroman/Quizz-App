import React from 'react'
import { getScoreBgColor, getScoreColor } from '../../../shared/helpers/get-score-color'
import type { CreateQuizAttempt } from '../../../interfaces/quizzly.interface'

interface Props {
    isDarkTheme: boolean,
    cardClass: string,
    textPrimaryClass: string,
    textSecondaryClass: string,
    scorePercentage: number
    result: CreateQuizAttempt,
    correctAnswers: number,
    totalQuestions: number
}

export const AttemptSummaryPercentage: React.FC<Props> = ({ 
    cardClass, 
    correctAnswers,
    textPrimaryClass, 
    textSecondaryClass, 
    scorePercentage, 
    isDarkTheme, 
    result,
    totalQuestions
}) => {
    return (
        <div className={`border ${cardClass} rounded-lg p-8 text-center mb-2`}>
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${getScoreBgColor(scorePercentage, isDarkTheme)} mb-4`}>
                <div className={`text-4xl font-bold ${getScoreColor(scorePercentage, isDarkTheme)}`}>
                    {scorePercentage}%
                </div>
            </div>
            <h2 className={`text-2xl font-bold ${textPrimaryClass} mb-2`}>¡Intento completado!</h2>
            <p className={`${textSecondaryClass} mb-6`}>Puntuación final: {result.score} / {result.totalPoints} puntos</p>

            <div className="flex justify-center gap-8">
                <div>
                    <div className="flex items-center justify-center gap-2 mb-1">
                        <i className="bx bxs-check-circle text-green-500"></i>
                        <span className={`text-lg font-semibold ${textPrimaryClass}`}>{correctAnswers}</span>
                    </div>
                    <p className={`text-sm ${textSecondaryClass}`}>Correctas</p>
                </div>
                <div>
                    <div className="flex items-center justify-center gap-2 mb-1">
                        <i className="bx bxs-x-circle text-red-500"></i>
                        <span className={`text-lg font-semibold ${textPrimaryClass}`}>{totalQuestions - correctAnswers}</span>
                    </div>
                    <p className={`text-sm ${textSecondaryClass}`}>Incorrectas</p>
                </div>
            </div>
        </div>
    )
}
