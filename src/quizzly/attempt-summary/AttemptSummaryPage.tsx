import React, { useEffect, useState } from 'react'
import { MainLayout } from '../../layout/MainLayout'
import { useAttempts, useNavigate, useTheme } from '../../shared/hooks'
import { useQuestion } from '../../shared/hooks/useQuestion'
import { AttemptSummaryHeader, QuestionCard } from './components'
import type { QuestionWithUserAnswer } from '../../interfaces/quizzly.interface'
import { Spinner } from '../../shared/components/Spinner'

export const AttemptSummaryPage: React.FC = () => {
    const { isDarkTheme } = useTheme()
    const { params } = useNavigate()
    const attemptId = params.id

    if (!attemptId) return null

    const [questionsWithAnswers, setQuestionsWithAnswers] = useState<QuestionWithUserAnswer[]>([])

    const { getAttemptById, isLoading } = useAttempts()
    const attempt = getAttemptById(attemptId)

    const { questions, isLoading: isLoadingQuestions } = useQuestion()

    useEffect(() => {
        const mapped: QuestionWithUserAnswer[] = questions.map(question => {
            const userAnswer = attempt.userAnswers.find(answer => answer.questionId === question.question.id)

            const selectedAnswer = userAnswer
                ? question.answers.find(answer => answer.id === userAnswer.answerId)
                : undefined

            return {
                question,
                userAnswer: userAnswer!,
                selectedAnswer,
            }
        })

        setQuestionsWithAnswers(mapped)
    }, [attemptId, questions])

    if (isLoading || isLoadingQuestions ) {
        return (
            <MainLayout title='Tus estadísticas'>
                <div className='h-screen flex flex-col items-center justify-center py-20 gap-4'>
                    <Spinner />
                    <p className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
                        Cargando...
                    </p>
                </div>
            </MainLayout>
        )
    }

    return (
        <MainLayout title='Resumen de intento'>
            <AttemptSummaryHeader
                score={attempt.result.score}
                totalPoints={attempt.result.totalPoints}
                isDarkTheme={isDarkTheme}
            />

            <div className="space-y-4">
                {questionsWithAnswers.map((item, index) => (
                    <QuestionCard
                        key={item.question.question.id}
                        item={item}
                        index={index}
                        isDarkTheme={isDarkTheme}
                    />
                ))}
            </div>
        </MainLayout>
    )
}