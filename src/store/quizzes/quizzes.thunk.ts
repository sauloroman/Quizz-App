import type { Dispatch } from "@reduxjs/toolkit";
import type { CreateQuiz, Quiz } from "../../interfaces/quizzly.interface";
import { addQuiz, setIsLoading, setQuizzes } from "./quizzes.slice";
import { setAlert } from "../ui/ui.slice";
import { formatErrorFromFirebase } from "../../shared/helpers/format-firebase-errors";
import { AlertType } from "../../interfaces/ui.interface";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore/lite";
import { FirebaseDB } from "../../config/firebase/config";
import type { RootState } from "../store";

export const startGettingQuizzesFromUser = () => {
    return async ( dispatch: Dispatch, getState: () => RootState ) => {
        dispatch(setIsLoading(true))
        try {

            const { auth: { user }} = getState()
            if ( !user ) return
            const { id: userID } = user

            const quizzesRef = collection(FirebaseDB, 'quizzes')
            const q = query(quizzesRef, where('userId', '==', userID))            
            const querySnapshot = await getDocs(q)

            const quizzes: Quiz[] = []

            querySnapshot.forEach( doc => {
                const data = doc.data()
                quizzes.push({
                    id: doc.id,
                    userId: data.userId,
                    title: data.title,
                    description: data.description,
                    subject: data.subject,
                    color: data.color,
                    image: data.image,
                    createdAt: data.createdAt?.toDate() || new Date(),
                    updatedAt: data.createdAt?.toDate() || new Date(),
                })
            })

            dispatch(setQuizzes(quizzes))

        } catch(error) {
            console.error(error)
            dispatch(setAlert({
                isOpen: true,
                title: 'Error - Obtener Quizzes de usuario',
                text: formatErrorFromFirebase(error),
                type: AlertType.error,
            }))
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}

export const startCreatingQuiz = ( createQuizData: CreateQuiz, navigate: (path: string) => void ) => {
    return async ( dispatch: Dispatch, getState: () => RootState ) => {
        dispatch( setIsLoading( true ))
        try {

            const { auth: { user }} = getState()
            if ( !user ) return
            const { id } = user

            const newDoc = doc( collection(FirebaseDB, 'quizzes') )
            await setDoc(newDoc, {...createQuizData, userId: id })

            const newQuizz: Quiz = {
                id: newDoc.id,
                userId: id,
                image: createQuizData.image ?? '',
                title: createQuizData.title,
                color: createQuizData.color,
                subject: createQuizData.subject,
                description: createQuizData.description,
                createdAt: new Date(),
                updatedAt: new Date()
            }

            dispatch(addQuiz(newQuizz))
            navigate('/quizzes')
            
        } catch( error ) {
            console.error(error)
            dispatch(setAlert({
                isOpen: true,
                title: 'Error - Crear Quiz',
                text: formatErrorFromFirebase(error),
                type: AlertType.error,
            }))
        } finally {
            dispatch( setIsLoading( false ))
        }
    }
}