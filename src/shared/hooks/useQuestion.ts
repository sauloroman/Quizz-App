import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import type { Answer, CreateQuestionWithAnswers, EditQuestionWithAnswers } from "../../interfaces/quizzly.interface"
import { startCreatingQuestionsForQuiz, startGettingQuestionsFromQuiz, startUpdatingQuestionForQuiz } from "../../store/questions/questions.thunk"
import { setCreatingNewQuestion, setQuestionSelected } from "../../store/questions/questions.slice"

export const useQuestion = () => {

    const dispatch = useDispatch<any>()
    const { 
        questions,
        questionSelected, 
        isLoading, 
        creatingNewQuestion 
    } = useSelector((state: RootState) => state.questions)

    const getQuestionsFromQuiz = ( quizId: string ) => {
        if ( !quizId ) throw new Error('El id del quiz es necesario para obteners las preguntas')
        dispatch(startGettingQuestionsFromQuiz(quizId))
    }

    const createQuestionInQuiz = (createQuestion: CreateQuestionWithAnswers ) => {
        dispatch( startCreatingQuestionsForQuiz(createQuestion))
    }

    const updateQuestionInQuiz = (editQuestion: EditQuestionWithAnswers) => {
        dispatch( startUpdatingQuestionForQuiz(editQuestion) )
    }

    const activateNewQuestionArea = ( isActive: boolean ) => {
        dispatch( setCreatingNewQuestion(isActive) )
    }

    const onSetQuestionSelected = ( questionId: string | null ) => {
        const question = questions.find( question => question.question.id === questionId )
        if ( !question ) throw new Error(`La pregunta con id ${questionId} no existe`)
        dispatch( setQuestionSelected(question) )
    }

    const onGetCorrectAnswerFromQuestionSelected = (): Answer => {
        const correctAnswer = questionSelected?.answers.find( ans => ans.isCorrect )
        if ( !correctAnswer ) throw new Error('El cuestionario seleccionado no tiene una respuesta correcta')
        return correctAnswer
    }

    return {
        questions,
        questionSelected,
        isLoading,
        creatingNewQuestion,

        getQuestionsFromQuiz,
        updateQuestionInQuiz,
        createQuestionInQuiz,
        activateNewQuestionArea,
        onSetQuestionSelected,
        onGetCorrectAnswerFromQuestionSelected,
    }

}