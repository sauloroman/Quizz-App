import type { Dispatch } from "@reduxjs/toolkit";
import type { CreateQuizAttempt, CreateUserAnswer, UserAnswer } from "../../interfaces/quizzly.interface";
import type { RootState } from "../store";
import { setIsAttemptFinished, setIsLoading } from "./attempt.slice";
import { setAlert } from "../ui/ui.slice";
import { formatErrorFromFirebase } from "../../shared/helpers/format-firebase-errors";
import { AlertType } from "../../interfaces/ui.interface";
import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../config/firebase/config";

export const startCreatingAttempt = ( attemptData: Omit<CreateQuizAttempt, 'userId'>, userAnswers: CreateUserAnswer[] ) => {
    return async ( dispatch: Dispatch, getState: () => RootState ) => {
        dispatch( setIsLoading(true) )
        try {
            const { auth: { user } } = getState()
            if ( !user ) return
            const { id: userId } = user

            const attemptRef = doc(collection(FirebaseDB, 'attempts'))
            await setDoc( attemptRef, { ...attemptData, userId } )

            const userAnswersArr: UserAnswer[] = []

            userAnswers.forEach( async (userAns) => {
                const userAnswerRef = doc(collection(FirebaseDB, `attempts/${attemptRef.id}/userAnswers`))
                await setDoc(userAnswerRef, { ...userAns, attemptId: attemptRef.id })

                const userAnswer: UserAnswer = {
                    id: userAnswerRef.id,
                    answerId: userAns.answerId,
                    attemptId: attemptRef.id,
                    isCorrect: userAns.isCorrect,
                    pointsEarned: userAns.pointsEarned,
                    questionId: userAns.questionId
                }

                userAnswersArr.push( userAnswer )
            })

            dispatch(setIsAttemptFinished(true))

        } catch( error ){
            console.error(error)
            dispatch(setAlert({
                isOpen: true,
                title: 'Error - Inicio de sesión',
                text: formatErrorFromFirebase(error),
                type: AlertType.error,
            }))
        } finally {
            dispatch( setIsLoading(false) )
        }
    }
}