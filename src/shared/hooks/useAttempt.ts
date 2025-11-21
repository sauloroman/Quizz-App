import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import type { CreateQuizAttempt, CreateUserAnswer, QuestionWithAnswers } from "../../interfaces/quizzly.interface"
import {
    incrementCounterAccumulated,
    resetCounterAccumulated,
    setCurrentQuestion,
    setCurrentQuestionNumber,
    setIsAttemptFinished,
    setIsCorrectAnswer,
    setIsResultVisible,
    setQuestionsAttempt,
    setQuizAttempt,
    setIsLoading,
    addUserAnswer,
    setQuizzAttemptResult,
    setUserAnswer,
} from "../../store/attempt/attempt.slice"
import { startCreatingAttempt } from "../../store/attempt/attempt.thunk"

export const useAttempt = () => {

    const dispatch = useDispatch<any>()
    const { 
       attempt: { 
            counterAccumulated, 
            currentQuestion, 
            questionsAttempt, 
            quizAttempt, 
            currentQuestionNumber, 
            isCorrectAnswer, 
            isResultVisible,
            isAttemptFinished,
            isLoading,
            quizzAttemptResult: {
                result, 
                userAnswers
            }
        },
        quizzes: { quizes },
        questions: { questions },
        auth: { user }
     } = useSelector((state: RootState) => state)

    const onSetQuizAttempt = (quizId: string) => {
        const quiz = quizes.find(quiz => quiz.id === quizId)
        if (!quiz) return null

        const questionsInQuiz = questions.filter(question => question.question.quizId === quizId)

        dispatch(setIsAttemptFinished(false))
        dispatch(setQuizAttempt(quiz))
        dispatch(setQuestionsAttempt(questionsInQuiz))
        dispatch(setCurrentQuestion(questionsInQuiz[0]))
        dispatch(setCurrentQuestionNumber(1))
    }

    const onCalculateTotalPointsInQuiz = () => {
        return questionsAttempt.reduce( (acc, question) => acc + question.question.points , 0)
    }

    const onCalculateTotalPointsEarned = () => {
        return  userAnswers.reduce( (acc, ans) => acc + ans.pointsEarned, 0)
    }

    const onSaveQuizAttempt = () => {
        if ( !quizAttempt || !user  || !result) return
        dispatch(startCreatingAttempt(result, userAnswers))
        onReset()
    }

    const onCheckIsCorrectAnswer = (answerId: string) => {
        if (!currentQuestion?.question) return

        const correctAnswer = currentQuestion?.answers.find(answer => answer.isCorrect)
        const isCorrect = correctAnswer?.id === answerId

        const userAnswer: CreateUserAnswer = {
            questionId: currentQuestion.question.id,
            answerId: answerId,
            isCorrect: isCorrect,
            pointsEarned: isCorrect ? currentQuestion.question.points : 0
        }

        if (isCorrect) {
            dispatch(incrementCounterAccumulated(currentQuestion?.question.points))
        } 

        dispatch(setIsCorrectAnswer(isCorrect))
        dispatch(setIsResultVisible(true))
        dispatch(addUserAnswer(userAnswer))
    }

    const onNextQuestion = () => {
        const nextQuestionIndex = currentQuestionNumber
        
        dispatch(setIsResultVisible(false))
        dispatch(setIsLoading(true))

        if (nextQuestionIndex >= questionsAttempt.length) {
            onFinishQuizz()
            return
        }

        dispatch(setCurrentQuestion(questionsAttempt[nextQuestionIndex]))
        dispatch(setCurrentQuestionNumber(nextQuestionIndex + 1))
        dispatch(setIsLoading(false))
    }

    const onFinishQuizz = () => {
        if ( !quizAttempt || !user ) return null

        const userAttempt: CreateQuizAttempt = {
            quizId: quizAttempt.id,
            userId: user.id,
            score: onCalculateTotalPointsEarned(),
            totalPoints: onCalculateTotalPointsInQuiz(),
            completedAt: new Date(),
        }

        dispatch(setQuizzAttemptResult(userAttempt))
        dispatch(setIsAttemptFinished(true))
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

    const onSetIsAttemptFinished = ( isFinished: boolean ) => {
        dispatch( setIsAttemptFinished(isFinished) ) 
    }

    const onReset = () => {
        dispatch(resetCounterAccumulated())
        dispatch(setCurrentQuestion(null))
        dispatch(setQuestionsAttempt([]))
        dispatch(setIsCorrectAnswer(false))
        dispatch(setIsResultVisible(false))
        dispatch(setIsAttemptFinished(false))
        dispatch(setIsLoading(true))
        dispatch(setQuizzAttemptResult(null))
        dispatch(setUserAnswer([]))
    }

    return {
        quizAttempt,
        questionsAttempt,
        currentQuestion,
        currentQuestionNumber,
        counterAccumulated,
        isCorrectAnswer,
        isResultVisible,
        isAttemptFinished,
        isLoading,
        result,
        userAnswers,

        onCalculateTotalPointsInQuiz,
        onCheckIsCorrectAnswer,
        onSetQuizAttempt,
        onSetQuestionsAttempt,
        onSetCurrentQuestion,
        onIncrementCounter,
        onReset,
        onSetCurrentQuestionNumber,
        onSetResultIsVisible,
        onSetIsAttemptFinished,
        onNextQuestion,
        onFinishQuizz,
        onSaveQuizAttempt,
    }
}