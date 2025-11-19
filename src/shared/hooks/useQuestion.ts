import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import type { CreateQuestion } from "../../interfaces/quizzly.interface"
import { startCreatingQuestionsForQuiz } from "../../store/questions/questions.thunk"
import { setCreatingNewQuestion } from "../../store/questions/questions.slice"

export const useQuestion = () => {

    const dispatch = useDispatch<any>()
    const { questions, isLoading, creatingNewQuestion } = useSelector((state: RootState) => state.questions)

    const getQuestionsFromQuiz = ( quizId: string ) => {
        if ( !quizId ) throw new Error('El id del quiz es necesario para obteners las preguntas')
    }

    const createQuestionInQuiz = ( quizId: string, createQuestion: CreateQuestion ) => {
        if ( !quizId ) throw new Error('El id del quiz es necesario para crear una pregunta')
        dispatch( startCreatingQuestionsForQuiz(quizId, createQuestion))
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