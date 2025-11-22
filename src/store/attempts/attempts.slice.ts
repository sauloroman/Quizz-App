import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AttemptDBWithAnswers, QuizAttempt } from "../../interfaces/quizzly.interface";

interface AttemptsState {
    attempts: AttemptDBWithAnswers[],
    attemptSelected: QuizAttempt | null,
    isLoading: boolean
}

const initialState: AttemptsState = {
    attempts: [],
    attemptSelected: null,
    isLoading: false
}

export const attemptsSlice = createSlice({
    name: 'attempts',
    initialState: initialState,
    reducers: {

        setAttempts: ( state, {payload}: PayloadAction<AttemptDBWithAnswers[]> ) => {
            state.attempts = payload
        },

        setAttemptSelected: ( state, {payload}: PayloadAction<QuizAttempt> ) => {
            state.attemptSelected = payload
        },

        setIsLoading: ( state, {payload}: PayloadAction<boolean> ) => {
            state.isLoading = payload
        }

    }
})

export const {
    setAttempts,
    setAttemptSelected,
    setIsLoading
} = attemptsSlice.actions