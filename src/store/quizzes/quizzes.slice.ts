import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Quiz } from "../../interfaces/quizzly.interface";

interface QuizzesState {
    quizes: Quiz[],
    quizSelected: Quiz | null,
    isLoading: boolean
}

const initialState: QuizzesState = {
    quizes: [],
    quizSelected: null,
    isLoading: false
}

export const quizzeSlice = createSlice({
    name: 'quizzes',
    initialState: initialState,
    reducers: {

        addQuiz: ( state, {payload}: PayloadAction<Quiz> ) => {
            state.quizes.unshift( payload )
        },

        updateQuiz: ( state, {payload}: PayloadAction<{ quizId: string, changes: Quiz}>) => {
            state.quizes = state.quizes.map( quiz => {
                if ( quiz.id === payload.quizId ) {
                    return payload.changes
                }
                return quiz
            })
        },

        deleteQuiz: ( state, {payload}: PayloadAction<{ quizId: string }> ) => {
            state.quizes = state.quizes.filter( quiz => quiz.id !== payload.quizId )
        },

        setQuizzes: ( state, {payload}: PayloadAction<Quiz[]> ) => {
            state.quizes = payload
        },

        setIsLoading: ( state, {payload}: PayloadAction<boolean> ) => {
            state.isLoading = payload
        },

        setQuizSelected: ( state, {payload}: PayloadAction<Quiz | null>) => {
            state.quizSelected = payload
        }

    }
})

export const {
    addQuiz,
    deleteQuiz,
    updateQuiz,
    setQuizzes,
    setIsLoading,
    setQuizSelected,
} = quizzeSlice.actions