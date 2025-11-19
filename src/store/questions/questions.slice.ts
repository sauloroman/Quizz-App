import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Question } from "../../interfaces/quizzly.interface";

interface QuestionState {
    questions: Question[],
    isLoading: boolean,
    creatingNewQuestion: boolean,
}

const initialState: QuestionState = {
    questions: [],
    isLoading: false,
    creatingNewQuestion: false,
}

export const questionsSlice = createSlice({
    name: 'questions',
    initialState: initialState,
    reducers: {

        setIsLoading: ( state, {payload}: PayloadAction<boolean>) => {
            state.isLoading = payload
        },

        setQuestions: ( state, {payload}: PayloadAction<Question[]>) => {
            state.questions = payload
        },

        addQuestion: ( state, {payload}: PayloadAction<Question>) => {
            state.questions.unshift(payload)
        },

        setCreatingNewQuestion: ( state, {payload}: PayloadAction<boolean>) => {
            state.creatingNewQuestion = payload
        }

    }
})

export const {
    setIsLoading,
    setQuestions,
    setCreatingNewQuestion,
    addQuestion,
} = questionsSlice.actions