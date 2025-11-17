import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import type { LoginWithEmailAndPassword, RegisterUserWithEmail } from "../../interfaces/auth.interface"
import { startCreatingUserWithEmail, startLoggingUserWithEmail } from "../../store/auth/auth.thunk"

export const useAuth = () => {

    const dispatch = useDispatch<any>()
    const { user, isLoading, status } = useSelector( (state: RootState) => state.auth )

    const registerUser = ( data: RegisterUserWithEmail ) => {
        dispatch( startCreatingUserWithEmail(data) )
    }

    const loginUser = ( data: LoginWithEmailAndPassword ) => {
        dispatch( startLoggingUserWithEmail(data) )
    }

    return {
        // Attributes
        user,
        isLoading,
        status,

        // Methods
        registerUser,
        loginUser,
    }
}