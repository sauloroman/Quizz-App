import type { Dispatch } from "@reduxjs/toolkit";
import type { CreateQuestion, Question } from "../../interfaces/quizzly.interface";
import { addQuestion, setIsLoading, setQuestions } from "./questions.slice";
import { setAlert } from "../ui/ui.slice";
import { formatErrorFromFirebase } from "../../shared/helpers/format-firebase-errors";
import { AlertType } from "../../interfaces/ui.interface";
import { FirebaseDB } from "../../config/firebase/config";
import { collection, doc, getDocs, setDoc } from "firebase/firestore/lite";

export const startGettingQuestiosFromQuiz = ( quizId: string ) => {
    return async ( dispatch: Dispatch ) => {
        dispatch(setIsLoading(true))
        try {
            
            const questionsRef = collection(FirebaseDB, `quizzes/${quizId}/questions`)
            const questionsSnapshot = await getDocs(questionsRef)

            const questions: Question[] = []

            questionsSnapshot.forEach( doc => {
                const data = doc.data()
                questions.push({
                    id: doc.id,
                    quizId: data.quizId,
                    order: data.order,
                    points: data.points,
                    questionText: data.questionText,
                    createdAt: data.createdAt?.toDate() || new Date()
                })
            })

            dispatch(setQuestions(questions))

        } catch( error ) {
            console.error(error)
            dispatch(setAlert({
                isOpen: true,
                title: 'Error - Obtener Preguntas del Quiz',
                text: formatErrorFromFirebase(error),
                type: AlertType.error,
            }))
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}

export const startCreatingQuestionsForQuiz = ( quizId: string, createQuestion: CreateQuestion ) => {
    return async (dispatch: Dispatch) => {
        dispatch(setIsLoading(true))
        try {
            
            const newDoc = doc(collection(FirebaseDB, `quizzes/${quizId}/questions`))
            await setDoc(newDoc, {...createQuestion, quizId })

            const newQuestion: Question = {
                id: newDoc.id,
                order: createQuestion.order,
                points: createQuestion.points,
                questionText: createQuestion.questionText,
                quizId: quizId,
                createdAt: new Date()
            }

            dispatch(addQuestion(newQuestion))

        } catch( error ) {
            console.error(error)
            dispatch(setAlert({
                isOpen: true,
                title: 'Error - Crear Pregunta En Quiz',
                text: formatErrorFromFirebase(error),
                type: AlertType.error,
            }))
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}