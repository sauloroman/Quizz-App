import type { Dispatch } from "@reduxjs/toolkit";
import type { CreateQuiz, EditQuiz, Quiz } from "../../interfaces/quizzly.interface";
import { addQuiz, deleteQuiz, setIsLoading, setQuizzes, updateQuiz } from "./quizzes.slice";
import { setAlert } from "../ui/ui.slice";
import { formatErrorFromFirebase } from "../../shared/helpers/format-firebase-errors";
import { AlertType } from "../../interfaces/ui.interface";
import { collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore/lite";
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

export const startUpdatinQuiz = (quizId: string, data: EditQuiz, navigate: (path: string) => void) => {
    return async ( dispatch: Dispatch, getState: () => RootState ) => {
        dispatch(setIsLoading(true))
        try {

            const { auth: { user }} = getState()
            if ( !user ) return
            const { id } = user

            if ( !quizId ) throw new Error('El ID del quiz es necesario para actualizar')

            const quizRef = doc(FirebaseDB, 'quizzes', quizId)
            
            const updateData = {
                ...data,
                updatedAt: new Date(),
            }

            await updateDoc(quizRef, updateData)

            const updatedQuiz: Quiz = {
                id: quizRef.id,
                userId: id,
                image: data.image ?? '',
                title: data.title ?? '',
                color: data.color,
                subject: data.subject ?? '',
                description: data.description,
                createdAt: new Date(),
                updatedAt: new Date()
            }

            dispatch(updateQuiz({
                quizId: quizId,
                changes: updatedQuiz
            }))

            dispatch(setAlert({
                isOpen: true,
                title: 'Éxito',
                text: 'Quiz actualizado correctamente',
                type: AlertType.success,
            }))

            navigate('quizzes')

        } catch(error){
            console.error(error)
            dispatch(setAlert({
                isOpen: true,
                title: 'Error - Editar Quiz',
                text: formatErrorFromFirebase(error),
                type: AlertType.error,
            }))    
        } finally { 
            dispatch(setIsLoading(false))
        }
    }
}

export const startDeletingQuiz = (quizId: string, navigate: (path: string) => void) => {
    return async (dispatch: Dispatch) => {
        dispatch(setIsLoading(true))
        try {

            if (!quizId) throw new Error('El ID del quiz es necesario para eliminarlo')

            const quizRef = doc(FirebaseDB, 'quizzes', quizId)
            await deleteDoc(quizRef)

            dispatch(deleteQuiz({ quizId }))

            dispatch(setAlert({
                isOpen: true,
                title: 'Éxito',
                text: 'Quiz eliminado correctamente',
                type: AlertType.success,
            }))

            navigate('quizzes')

        } catch (error) {
            console.error(error)
            dispatch(setAlert({
                isOpen: true,
                title: 'Error - Eliminar Quiz',
                text: formatErrorFromFirebase(error),
                type: AlertType.error,
            }))
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}