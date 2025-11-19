import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import type { CreateQuiz, EditQuiz } from "../../interfaces/quizzly.interface"
import { startCreatingQuiz, startDeletingQuiz, startGettingQuizzesFromUser, startUpdatinQuiz } from "../../store/quizzes/quizzes.thunk"
import { useNavigate } from "react-router-dom"
import { setQuizSelected } from "../../store/quizzes/quizzes.slice"

export const useQuiz = () => {

    const dispatch = useDispatch<any>()
    const navigate = useNavigate()
    const { quizes, isLoading, quizSelected } = useSelector( (state: RootState) => state.quizzes )

    const getQuizzes = () => {
        dispatch(startGettingQuizzesFromUser())
    }

    const createNewQuiz = ( data: CreateQuiz ) => {
        dispatch( startCreatingQuiz({...data}, navigate) )
    }

    const updateQuiz = ( quizId: string, data: EditQuiz ) => {
        dispatch(startUpdatinQuiz(quizId, data, navigate))
    }

    const deleteQuiz = ( quizId: string ) => {
        dispatch(startDeletingQuiz(quizId, navigate))
    }

    const activateQuiz = (id: string) => {
        const quiz = quizes.find( quiz => quiz.id === id )
        if ( !quiz ) {
            dispatch(setQuizSelected(null))
            return
        }
        dispatch(setQuizSelected(quiz))
    }

    return {
        isLoading,
        quizes,
        quizSelected,

        getQuizzes,
        createNewQuiz,
        activateQuiz,
        deleteQuiz,
        updateQuiz
    }

}