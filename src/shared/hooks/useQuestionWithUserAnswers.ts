import { useEffect, useState } from 'react'
import type { QuestionWithAnswers, QuestionWithUserAnswer, UserAnswer } from '../../interfaces/quizzly.interface'

export const useQuestionWithUserAnswers = (
  questions: QuestionWithAnswers[],
  userAnswers: UserAnswer[],
  quizId: string
) => {

  const [questionsWithAnswers, setQuestionsWithAnswers] = useState<QuestionWithUserAnswer[]>([])

  useEffect(() => {
    if (!questions || questions.length === 0 || !userAnswers || userAnswers.length === 0) {
      setQuestionsWithAnswers([])
      return
    }

    const quizQuestions = questions.filter(question => question.question.quizId === quizId)

    if (quizQuestions.length === 0) {
      setQuestionsWithAnswers([])
      return
    }

    const mapped: QuestionWithUserAnswer[] = quizQuestions.map(question => {
      const userAnswer = userAnswers.find(answer => answer.questionId === question.question.id)
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
  }, [questions, userAnswers, quizId])

  return questionsWithAnswers
}