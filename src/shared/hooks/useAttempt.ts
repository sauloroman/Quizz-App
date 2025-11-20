import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import type { QuestionWithAnswers } from "../../interfaces/quizzly.interface"
import {
    incrementCounterAccumulated,
    resetCounterAccumulated,
    setCurrentQuestion,
    setCurrentQuestionNumber,
    setIsCorrectAnswer,
    setIsResultVisible,
    setQuestionsAttempt,
    setQuizAttempt
} from "../../store/attempt/attempt.slice"
import { useQuiz } from "./useQuiz"
import { useQuestion } from "./useQuestion"

export const useAttempt = () => {

    const dispatch = useDispatch<any>()
    const { counterAccumulated, currentQuestion, questionsAttempt, quizAttempt, currentQuestionNumber, isCorrectAnswer, isResultVisible } = useSelector((state: RootState) => state.attempt)
    const { quizes } = useQuiz()
    const { questions } = useQuestion()

    const onSetQuizAttempt = (quizId: string) => {
        if (!quizId) return null
        const quiz = quizes.find(quiz => quiz.id === quizId)

        if (!quiz) return null

        const questionsInQuiz = questions.filter(question => question.question.quizId === quizId)

        dispatch(setQuizAttempt(quiz))
        dispatch(setQuestionsAttempt(questionsInQuiz))
        dispatch(setCurrentQuestion(questionsInQuiz[0]))
        dispatch(setCurrentQuestionNumber(1))
    }

    const onCalculateTotalPointsInQuiz = () => {
        return questionsAttempt.reduce( (acc, question) => acc + question.question.points , 0)
    }

    const onCheckIsCorrectAnswer = (answerId: string) => {
        if (!currentQuestion?.question) return

        const correctAnswer = currentQuestion?.answers.find(answer => answer.isCorrect)
        const isCorrect = correctAnswer?.id === answerId

        if (isCorrect) {
            dispatch(incrementCounterAccumulated(currentQuestion?.question.points))
        }

        dispatch(setIsCorrectAnswer(isCorrect))
        dispatch(setIsResultVisible(true))
    }

    const onNextQuestion = () => {
        dispatch(setIsResultVisible(false))
        dispatch(setCurrentQuestion(questions[currentQuestionNumber]))
        dispatch(setCurrentQuestionNumber(currentQuestionNumber + 1))
    }

    const onSetQuestionsAttempt = (questions: QuestionWithAnswers[]) => {
        dispatch(setQuestionsAttempt(questions))
    }

    const onSetCurrentQuestion = (question: QuestionWithAnswers) => {
        dispatch(setCurrentQuestion(question))
    }

    const onSetCurrentQuestionNumber = (questionNumber: number) => {
        dispatch(setCurrentQuestionNumber(questionNumber))
    }

    const onIncrementCounter = (points: number) => {
        dispatch(incrementCounterAccumulated(points))
    }

    const onSetResultIsVisible = (isVisible: boolean) => {
        dispatch(setIsResultVisible(isVisible))
    }

    const onReset = () => {
        dispatch(resetCounterAccumulated())
        dispatch(setCurrentQuestion(null))
        dispatch(setQuestionsAttempt([]))
        dispatch(setIsCorrectAnswer(false))
        dispatch(setIsResultVisible(false))
    }

    return {
        quizAttempt,
        questionsAttempt,
        currentQuestion,
        currentQuestionNumber,
        counterAccumulated,
        isCorrectAnswer,
        isResultVisible,

        onCalculateTotalPointsInQuiz,
        onCheckIsCorrectAnswer,
        onSetQuizAttempt,
        onSetQuestionsAttempt,
        onSetCurrentQuestion,
        onIncrementCounter,
        onReset,
        onSetCurrentQuestionNumber,
        onSetResultIsVisible,
        onNextQuestion,
    }

}