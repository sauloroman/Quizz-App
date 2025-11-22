import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { QuestionWithAnswers } from "../../interfaces/quizzly.interface";

interface QuestionState {
    questions: QuestionWithAnswers[],
    questionSelected: QuestionWithAnswers | null,
    isLoading: boolean,
    creatingNewQuestion: boolean,
}

const initialState: QuestionState = {
    questions: [],
    questionSelected: null,
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

        setQuestionSelected: ( state, {payload}: PayloadAction<QuestionWithAnswers | null>) => {
            state.questionSelected = payload
        },

        setQuestions: ( state, {payload}: PayloadAction<QuestionWithAnswers[]>) => {
            state.questions = payload
        },

        addQuestion: ( state, {payload}: PayloadAction<QuestionWithAnswers>) => {
            state.questions.unshift(payload)
        },

        updateQuestion: ( state, {payload}: PayloadAction<QuestionWithAnswers>) => {
            state.questions = state.questions.map( question => {
                if ( question.question.id === payload.question.id ) {
                    return payload
                }
                return question
            })
        },

        deleteQuestion: ( state, {payload}: PayloadAction<string>) => {
            state.questions = state.questions.filter( question => question.question.id !== payload)
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
    setQuestionSelected,
    addQuestion,
    updateQuestion,
    deleteQuestion,
} = questionsSlice.actions