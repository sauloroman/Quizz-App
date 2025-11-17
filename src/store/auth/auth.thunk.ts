import type { Dispatch } from "@reduxjs/toolkit"
import { loginWithEmailAndPassword, registerUserWithEmail } from "../../config/firebase/provider"
import { login, setIsLoading } from "./auth.slice"
import type { LoginWithEmailAndPassword, RegisterUserWithEmail } from "../../interfaces/auth.interface"
import { setAlert } from "../ui/ui.slice"
import { AlertType } from "../../interfaces/ui.interface"
import { formatErrorFromFirebase } from "../../shared/helpers/format-firebase-errors"

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