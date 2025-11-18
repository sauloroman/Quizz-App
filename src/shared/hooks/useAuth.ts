import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import type { LoginWithEmailAndPassword, RegisterUserWithEmail } from "../../interfaces/auth.interface"
import { startCreatingUserWithEmail, startLoggingOutUser, startLoggingUserWithEmail } from "../../store/auth/auth.thunk"
import { onAuthStateChanged } from "firebase/auth"
import { FirebaseAuth } from "../../config/firebase/config"
import { login, logout } from "../../store/auth/auth.slice"

export const useAuth = () => {

    const dispatch = useDispatch<any>()
    const { user, isLoading, status } = useSelector( (state: RootState) => state.auth )

    const registerUser = ( data: RegisterUserWithEmail ) => {
        dispatch( startCreatingUserWithEmail(data) )
    }

    const loginUser = ( data: LoginWithEmailAndPassword ) => {
        dispatch( startLoggingUserWithEmail(data) )
    }

    const logoutUser = () => {
        dispatch( startLoggingOutUser() )
    }

    const checkAuth = () => {
        onAuthStateChanged( FirebaseAuth, async (user) => {
            if (!user) return dispatch( logout() )

            const { displayName, email, uid } = user!

            dispatch( login({ 
                name: displayName!, 
                email: email!, 
                id: uid!,
                createdAt: new Date(user.metadata.creationTime!)
            }))
        } )
    }

    return {
        // Attributes
        user,
        isLoading,
        status,

        // Methods
        registerUser,
        loginUser,
        logoutUser,
        checkAuth,
    }
}