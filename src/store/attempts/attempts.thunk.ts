import type { Dispatch } from "@reduxjs/toolkit"
import type { RootState } from "../store"
import { setAttempts, setIsLoading } from "./attempts.slice"
import { setAlert } from "../ui/ui.slice"
import { formatErrorFromFirebase } from "../../shared/helpers/format-firebase-errors"
import { AlertType } from "../../interfaces/ui.interface"
import { FirebaseDB } from "../../config/firebase/config"
import { collection, getDocs, query, where } from "firebase/firestore/lite"
import type { QuizAttempt, UserAnswer } from "../../interfaces/quizzly.interface"

export const startGettingAttemptsOfUser = () => {
    return async ( dispatch: Dispatch, getState: () => RootState ) => {
        dispatch( setIsLoading(true) )
        try {

            const { auth: { user } } = getState()
            if ( !user ) throw new Error('El usuario debe iniciar sesión')
            const { id } = user

            const attemptsRef = collection(FirebaseDB, 'attempts')
            const q = query(attemptsRef, where('userId', '==', id))
            const querySnapshot = await getDocs(q)

            const attemptPromises = querySnapshot.docs.map( async (doc) => {
                const data = doc.data()
                const attempt: QuizAttempt = {
                    id: doc.id,
                    quizId: data.quizId,
                    userId: data.userId,
                    score: data.score,
                    totalPoints: data.totalPoints,
                    completedAt: data.createdAt?.toDate() || new Date(),
                }

                const userAnswersRef = collection(FirebaseDB, `attempts/${attempt.id}/userAnswers`)
                const userAnswersSnapshot = await getDocs( userAnswersRef )
                
                const userAnswers: UserAnswer[] = userAnswersSnapshot.docs.map( ans => {
                    const data = ans.data()
                    return {
                        id: ans.id,
                        answerId: data.answerId,
                        attemptId: data.attemptId,
                        isCorrect: data.isCorrect,
                        pointsEarned: data.pointsEarned,
                        questionId: data.questionId,
                    }
                })

                return {
                    result: attempt,
                    userAnswers: userAnswers
                }
            })

            const resolvedAttempts = await Promise.all(attemptPromises)
            
            dispatch(setAttempts(resolvedAttempts))

        } catch( error ){
            console.log(error)
            dispatch(setAlert({
                isOpen: true,
                title: 'Error -  Obtener intentos',
                text: formatErrorFromFirebase(error),
                type: AlertType.error
            }))
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}