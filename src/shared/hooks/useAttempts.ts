import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import { startGettingAttemptsOfUser } from "../../store/attempts/attempts.thunk"
import type { AttemptDBWithAnswers } from "../../interfaces/quizzly.interface"

export const useAttempts = () => {

    const dispatch = useDispatch<any>()
    const { attemptSelected, attempts, isLoading } = useSelector( (state: RootState) => state.attempts )

    const getAttemptsOfUser = () => {
        dispatch( startGettingAttemptsOfUser() )
    }

    const getAttemptById = ( attemptId: string ) => {
        if ( attempts.length === 0 ) throw new Error('No hay intentos por buscar')
        const attempt = attempts.find( (attempt: AttemptDBWithAnswers) => attempt.result.id === attemptId )
        if ( !attempt ) throw new Error('No se encontró el intento')
        return attempt
    }

    return {
        isLoading,
        attemptSelected,
        attempts,

        getAttemptsOfUser,
        getAttemptById,
    }

}