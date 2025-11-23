import React, { useEffect, useState } from 'react'
import { MainLayout } from '../../layout/MainLayout'
import { useAttempts, useNavigate, useTheme } from '../../shared/hooks'
import { useQuestion } from '../../shared/hooks/useQuestion'
import { AttemptSummaryHeader, QuestionCard } from './components'
import type { QuestionWithUserAnswer } from '../../interfaces/quizzly.interface'

export const AttemptSummaryPage: React.FC = () => {
    const { isDarkTheme } = useTheme()
    const { params } = useNavigate()
    const attemptId = params.id

    if (!attemptId) return null

    const [questionsWithAnswers, setQuestionsWithAnswers] = useState<QuestionWithUserAnswer[]>([])

    const { getAttemptById } = useAttempts()
    const attempt = getAttemptById(attemptId)

    const { questions } = useQuestion()

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
        console.log(mapped)
        setQuestionsWithAnswers(mapped)
    }, [attemptId, questions])

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