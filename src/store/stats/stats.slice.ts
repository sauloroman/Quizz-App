import { createSlice } from "@reduxjs/toolkit"
import type { OverallStats, QuizStats, UserProgressData } from "../../interfaces/quizzly.interface"

interface StatsState {
    overallStats: OverallStats | null
    quizStats: QuizStats[]
    progressData: UserProgressData | null
    isLoading: boolean
    error: string | null
}

const initialState: StatsState = {
    overallStats: null,
    quizStats: [],
    progressData: null,
    isLoading: false,
    error: null,
}

export const statsSlice = createSlice({
    name: 'stats',
    initialState: initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },

        setOverallStats: (state, action) => {
            state.overallStats = action.payload
            state.error = null
        },

        setQuizStats: (state, action) => {
            state.quizStats = action.payload
            state.error = null
        },

        setProgressData: (state, action) => {
            state.progressData = action.payload
        },

        addQuizStats: (state, action) => {
            const existingQuizIndex = state.quizStats.findIndex(
                quiz => quiz.quizId === action.payload.quizId
            )
            
            if (existingQuizIndex >= 0) {
                state.quizStats[existingQuizIndex] = action.payload
            } else {
                state.quizStats.push(action.payload)
            }
        },

        setError: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },

        clearStats: (state) => {
            state.overallStats = null
            state.quizStats = []
            state.progressData = null
            state.error = null
        },

        resetError: (state) => {
            state.error = null
        },
    },
})

export const {
    setIsLoading,
    setOverallStats,
    setQuizStats,
    setProgressData,
    addQuizStats,
    setError,
    clearStats,
    resetError,
} = statsSlice.actions

export default statsSlice.reducer