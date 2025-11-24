import type { Dispatch } from "@reduxjs/toolkit"
import { loginWithEmailAndPassword, logoutFirebase, registerUserWithEmail, singInWithGoogle } from "../../config/firebase/provider"
import { login, logout, setIsLoading } from "./auth.slice"
import type { LoginWithEmailAndPassword, RegisterUserWithEmail } from "../../interfaces/auth.interface"
import { resetUIState, setAlert } from "../ui/ui.slice"
import { AlertType } from "../../interfaces/ui.interface"
import { formatErrorFromFirebase } from "../../shared/helpers/format-firebase-errors"
import { resetQuestionsState } from "../questions/questions.slice"
import { resetQuizzesState } from "../quizzes/quizzes.slice"
import { resetAttemptsState } from "../attempts/attempts.slice"
import { resetAttemptState } from "../attempt/attempt.slice"
import { resetStatsState } from "../stats/stats.slice"

export const startLoggingWithGoogle = () => {
    return async ( dispatch: Dispatch ) => {
        dispatch( setIsLoading( true ))
        try {

            const result = await singInWithGoogle()

            dispatch(login(result))
            dispatch(setAlert({
                isOpen: true,
                title: 'Inicio de sesión',
                text: `Bievenido ${result.name}`,
                type: AlertType.success,
            }))

        } catch( error ) {
            console.error(error)
            dispatch(setAlert({
                isOpen: true,
                title: 'Error - Inicio de sesión Google',
                text: formatErrorFromFirebase(error),
                type: AlertType.error,
            }))
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}

export const startLoggingUserWithEmail = ( data: LoginWithEmailAndPassword ) => {
    return async ( dispatch: Dispatch ) => {
        dispatch( setIsLoading( true ) )
        try {
            const result = await loginWithEmailAndPassword({ 
                email: data.email,
                password: data.password,
            })

            dispatch(login(result))
            dispatch(setAlert({
                isOpen: true,
                title: 'Inicio de sesión',
                text: `Bievenido ${result.name}`,
                type: AlertType.success,
            }))

        } catch (error) {
            console.error(error)
            dispatch(setAlert({
                isOpen: true,
                title: 'Error - Inicio de sesión',
                text: formatErrorFromFirebase(error),
                type: AlertType.error,
            }))
        } finally {
            dispatch( setIsLoading( false ) )
        }
    }
}

export const startCreatingUserWithEmail = (data: RegisterUserWithEmail) => {
    return async ( dispatch: Dispatch ) => {
        dispatch( setIsLoading( true ) )
        try {
            const result = await registerUserWithEmail({ 
                email: data.email,
                password: data.password,
                name: data.name
            })

            dispatch(login(result))
            dispatch(setAlert({
                isOpen: true,
                title: 'Creación de Usuario',
                text: 'Usuario creado exitosamente',
                type: AlertType.success,
            }))

        } catch (error) {
            console.error(error)
            dispatch(setAlert({
                isOpen: true,
                title: 'Error - Creación de Usuario',
                text: formatErrorFromFirebase(error),
                type: AlertType.error,
            }))
        } finally {
            dispatch( setIsLoading( false ) )
        }
    }
}

export const startLoggingOutUser = () => {
    return async ( dispatch: Dispatch ) => {
        dispatch( setIsLoading( true ) )
        try {
            await logoutFirebase()

            dispatch(logout())
            dispatch(resetAttemptState())
            dispatch(resetAttemptsState())
            dispatch(resetQuestionsState())
            dispatch(resetQuizzesState())
            dispatch(resetStatsState())
            dispatch(resetUIState())

            dispatch(setAlert({
                isOpen: true,
                title: 'Cierre de sesión',
                text: 'Hasta la próxima 👋',
                type: AlertType.success,
            }))

        } catch (error) {
            console.error(error)
            dispatch(setAlert({
                isOpen: true,
                title: 'Error - Cierre de sesión',
                text: formatErrorFromFirebase(error),
                type: AlertType.error,
            }))
        } finally {
            dispatch( setIsLoading( false ) )
        }
    }
}