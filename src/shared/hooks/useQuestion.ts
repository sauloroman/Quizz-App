import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import type { CreateQuestionWithAnswers } from "../../interfaces/quizzly.interface"
import { startCreatingQuestionsForQuiz, startGettingQuestionsFromQuiz } from "../../store/questions/questions.thunk"
import { setCreatingNewQuestion } from "../../store/questions/questions.slice"

export const useQuestion = () => {

    const dispatch = useDispatch<any>()
    const { questions, isLoading, creatingNewQuestion } = useSelector((state: RootState) => state.questions)

    const getQuestionsFromQuiz = ( quizId: string ) => {
        if ( !quizId ) throw new Error('El id del quiz es necesario para obteners las preguntas')
        dispatch(startGettingQuestionsFromQuiz(quizId))
    }

    const createQuestionInQuiz = (createQuestion: CreateQuestionWithAnswers ) => {
        dispatch( startCreatingQuestionsForQuiz(createQuestion))
    }

    const activateNewQuestionArea = ( isActive: boolean ) => {
        dispatch( setCreatingNewQuestion(isActive) )
    }

    return {
        questions,
        isLoading,
        creatingNewQuestion,

        getQuestionsFromQuiz,
        createQuestionInQuiz,
        activateNewQuestionArea,
    }

}