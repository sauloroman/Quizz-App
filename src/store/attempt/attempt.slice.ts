import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { QuestionWithAnswers, Quiz } from "../../interfaces/quizzly.interface";

interface AttemptState {
    quizAttempt: Quiz | null,
    questionsAttempt: QuestionWithAnswers[],
    currentQuestion: QuestionWithAnswers | null,
    currentQuestionNumber: number,
    counterAccumulated: number,
    isCorrectAnswer: boolean,
    isResultVisible: boolean,
}

const initialState: AttemptState = {
    quizAttempt: null,
    questionsAttempt: [],
    currentQuestion: null,
    counterAccumulated: 0,
    currentQuestionNumber: 0,
    isCorrectAnswer: false,
    isResultVisible: false,
}

export const attemptSlice = createSlice({
    name: 'attempt',
    initialState: initialState,
    reducers: {

        setQuizAttempt: ( state, {payload}: PayloadAction<Quiz | null>) => {
            state.quizAttempt = payload
        },

        setQuestionsAttempt: ( state, { payload }: PayloadAction<QuestionWithAnswers[]>) => {
            state.questionsAttempt = payload
        },

        setCurrentQuestion: ( state, {payload}: PayloadAction<QuestionWithAnswers | null>) => {
            state.currentQuestion = payload
        },

        setIsResultVisible: ( state, {payload}: PayloadAction<boolean>) => {
            state.isResultVisible = payload 
        },

        setIsCorrectAnswer: ( state, {payload}: PayloadAction<boolean>) => {
            state.isCorrectAnswer = payload 
        },

        setCurrentQuestionNumber: ( state, { payload }: PayloadAction<number> ) => {
            state.currentQuestionNumber = payload
        },

        incrementCounterAccumulated: ( state, {payload}: PayloadAction<number> ) => {
            state.counterAccumulated += payload
        },

        resetCounterAccumulated: ( state ) => {
            state.counterAccumulated = 0
        }

    }
})

export const {
    setQuizAttempt,
    setQuestionsAttempt,
    setCurrentQuestion,
    setCurrentQuestionNumber,
    incrementCounterAccumulated,
    resetCounterAccumulated,
    setIsCorrectAnswer,
    setIsResultVisible,
} = attemptSlice.actions