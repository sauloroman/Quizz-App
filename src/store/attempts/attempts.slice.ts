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

        addAttempt: ( state, {payload}: PayloadAction<AttemptDBWithAnswers>) => {
            state.attempts.unshift(payload)
        },

        setAttempts: ( state, {payload}: PayloadAction<AttemptDBWithAnswers[]> ) => {
            state.attempts = payload
        },

        setAttemptSelected: ( state, {payload}: PayloadAction<QuizAttempt> ) => {
            state.attemptSelected = payload
        },

        setIsLoading: ( state, {payload}: PayloadAction<boolean> ) => {
            state.isLoading = payload
        },

        resetAttemptsState: ( state ) => {
            state.attempts = []
            state.attemptSelected = null
            state.isLoading = false 
        }

    }
})

export const {
    setAttempts,
    setAttemptSelected,
    setIsLoading,
    addAttempt,
    resetAttemptsState,
} = attemptsSlice.actions