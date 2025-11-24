import React, { useState } from 'react'
import { MainLayout } from '../../../layout/MainLayout'
import { useAttempt, useNavigate, useTheme } from '../../../shared/hooks'
import { SubmitButton } from '../../../shared/components/SubmitButton'
import { OutlineButton } from '../../../shared/components/OutlineButton'
import { AttemptSummaryUserAnswers } from './AttemptSummaryUserAnswers'
import { AttemptSummaryPercentage } from './AttemptSummaryPercentage'
import { AttemptSummaryStats } from './AttemptSummaryStats'
import { AttemptSummaryCorrectAnswers } from './AttemptSummaryCorrectAnswers'

export const AttemptSummary: React.FC = () => {
    const { isDarkTheme } = useTheme()
    const { userAnswers, result, questionsAttempt, onSaveQuizAttempt } = useAttempt()
    const [showCorrectAnswers, setShowCorrectAnswers] = useState(false)
    const { goToPage } = useNavigate()

    if (!result) {
        return (
            <MainLayout title="Resumen de intento">
                <div className={`flex items-center justify-center h-[70vh] px-4 ${
                    isDarkTheme ? 'bg-gray-900' : 'bg-gray-50'
                }`}>
                    <p className={isDarkTheme ? 'text-gray-400' : 'text-gray-600'}>
                        No hay datos de intento disponibles
                    </p>
                </div>
            </MainLayout>
        )
    }

    const scorePercentage = result.totalPoints > 0
        ? Math.round((result.score / result.totalPoints) * 100)
        : 0

    const correctAnswers = userAnswers.filter(a => a.isCorrect).length
    const totalQuestions = userAnswers.length

    const cardClass = isDarkTheme ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    const textPrimaryClass = isDarkTheme ? 'text-white' : 'text-gray-900'
    const textSecondaryClass = isDarkTheme ? 'text-gray-400' : 'text-gray-600'

    const onSaveAttempt = () => {
        onSaveQuizAttempt()
        goToPage('attempts')
    }

    return (
        <MainLayout title="Resumen de intento">
            <div className="px-4 py-8">

                <div className="mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">

                    <aside className="space-y-6 lg:col-span-1 animate__animated animate__fadeInRight">

                        <AttemptSummaryPercentage
                            cardClass={cardClass}
                            correctAnswers={correctAnswers}
                            isDarkTheme={isDarkTheme}
                            result={result}
                            scorePercentage={scorePercentage}
                            textPrimaryClass={textPrimaryClass}
                            textSecondaryClass={textSecondaryClass}
                            totalQuestions={totalQuestions}
                        />

                        <AttemptSummaryStats
                            cardClass={cardClass}
                            correctAnswers={correctAnswers}
                            result={result}
                            textPrimaryClass={textPrimaryClass}
                            textSecondaryClass={textSecondaryClass}
                            totalQuestions={totalQuestions}
                        />

                        <div className="flex flex-col gap-4 pt-2">
                            <SubmitButton
                                onClick={onSaveAttempt}
                                text="Aceptar"
                            />

                            <OutlineButton
                                onClick={() => setShowCorrectAnswers(!showCorrectAnswers)}
                                text={showCorrectAnswers ? 'Ocultar Respuestas' : 'Ver Respuestas'}
                            />
                        </div>

                    </aside>

                    <section className="lg:col-span-3 animate__animated animate__fadeInLeft">
                        {!showCorrectAnswers ? (
                            <AttemptSummaryUserAnswers
                                isDarkTheme={isDarkTheme}
                                cardClass={cardClass}
                                textPrimaryClass={textPrimaryClass}
                                textSecondaryClass={textSecondaryClass}
                                questionsAttempt={questionsAttempt}
                                userAnswers={userAnswers}
                            />
                        ) : (
                            <AttemptSummaryCorrectAnswers
                                isDarkTheme={isDarkTheme}
                                questions={questionsAttempt}
                            />
                        )}
                    </section>

                </div>

            </div>
        </MainLayout>
    )
}
