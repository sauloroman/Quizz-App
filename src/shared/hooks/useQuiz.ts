import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import type { CreateQuiz, Quiz } from "../../interfaces/quizzly.interface"
import { startCreatingQuiz, startGettingQuizzesFromUser } from "../../store/quizzes/quizzes.thunk"
import { useNavigate } from "react-router-dom"
import { setQuizSelected } from "../../store/quizzes/quizzes.slice"

export const useQuiz = () => {

    const dispatch = useDispatch<any>()
    const navigate = useNavigate()
    const { quizes, isLoading } = useSelector( (state: RootState) => state.quizzes )

    const getQuizzes = () => {
        dispatch(startGettingQuizzesFromUser())
    }

    const createNewQuiz = ( data: CreateQuiz ) => {
        dispatch( startCreatingQuiz(data, navigate) )
    }

    const activateQuiz = (quiz: Quiz) => {
        dispatch(setQuizSelected(quiz))
    }

    return {
        isLoading,
        quizes,

        getQuizzes,
        createNewQuiz,
        activateQuiz
    }

}