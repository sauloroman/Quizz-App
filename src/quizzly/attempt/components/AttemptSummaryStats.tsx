import React from 'react'
import type { CreateQuizAttempt } from '../../../interfaces/quizzly.interface'

interface Props {
    cardClass: string,
    textPrimaryClass: string,
    textSecondaryClass: string,
    totalQuestions: number
    correctAnswers: number,
    result: CreateQuizAttempt
}

export const AttemptSummaryStats: React.FC<Props> = ({ cardClass, textPrimaryClass, textSecondaryClass, totalQuestions, correctAnswers, result }) => {
    return (
        <div className={`border ${cardClass} rounded-lg p-6 mb-4`}>
            <div className="flex items-center gap-2 mb-4">
                <i className="bx bxs-bar-chart-alt-2"></i>
                <h3 className={`text-lg font-semibold ${textPrimaryClass}`}>Estadísticas</h3>
            </div>
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <span className={textSecondaryClass}>Total de preguntas</span>
                    <span className={`font-semibold ${textPrimaryClass}`}>{totalQuestions}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className={textSecondaryClass}>Tasa de acierto</span>
                    <span className={`font-semibold ${textPrimaryClass}`}>{totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0}%</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className={textSecondaryClass}>Puntos promedio por pregunta</span>
                    <span className={`font-semibold ${textPrimaryClass}`}>{totalQuestions > 0 ? (result.score / totalQuestions).toFixed(1) : 0}</span>
                </div>
            </div>
        </div>
    )
}
