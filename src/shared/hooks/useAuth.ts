import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import type { LoginWithEmailAndPassword, RegisterUserWithEmail } from "../../interfaces/auth.interface"
import { startCreatingUserWithEmail, startLoggingOutUser, startLoggingUserWithEmail, startLoggingWithGoogle } from "../../store/auth/auth.thunk"
import { onAuthStateChanged } from "firebase/auth"
import { FirebaseAuth } from "../../config/firebase/config"
import { login, logout } from "../../store/auth/auth.slice"
import { resetAttemptState } from "../../store/attempt/attempt.slice"
import { resetAttemptsState } from "../../store/attempts/attempts.slice"
import { resetQuestionsState } from "../../store/questions/questions.slice"
import { resetQuizzesState } from "../../store/quizzes/quizzes.slice"
import { resetStatsState } from "../../store/stats/stats.slice"
import { resetUIState } from "../../store/ui/ui.slice"

export const useAuth = () => {

    const dispatch = useDispatch<any>()
    const { user, isLoading, status } = useSelector((state: RootState) => state.auth)

    const registerUser = (data: RegisterUserWithEmail) => {
        dispatch(startCreatingUserWithEmail(data))
    }

    const loginUser = (data: LoginWithEmailAndPassword) => {
        dispatch(startLoggingUserWithEmail(data))
    }

    const loginUserWithGoogle = () => {
        dispatch(startLoggingWithGoogle())
    }

    const logoutUser = () => {
        dispatch(startLoggingOutUser())
    }

    const checkAuth = () => {
        onAuthStateChanged(FirebaseAuth, async (user) => {

            if (!user) {
                dispatch(logout())
                dispatch(resetAttemptState())
                dispatch(resetAttemptsState())
                dispatch(resetQuestionsState())
                dispatch(resetQuizzesState())
                dispatch(resetStatsState())
                dispatch(resetUIState())
                return
            }

            dispatch(login({
                id: user.uid,
                email: user.email!,
                name: user.displayName!,
                createdAt: new Date(user.metadata.creationTime!)
            }))
        })
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
        loginUserWithGoogle,
    }
}