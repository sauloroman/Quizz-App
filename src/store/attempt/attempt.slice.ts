import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AttemptWithAnswers, CreateQuizAttempt, CreateUserAnswer, QuestionWithAnswers, Quiz } from "../../interfaces/quizzly.interface";

interface AttemptState {
    quizAttempt: Quiz | null,
    questionsAttempt: QuestionWithAnswers[],
    currentQuestion: QuestionWithAnswers | null,
    currentQuestionNumber: number,
    counterAccumulated: number,
    isCorrectAnswer: boolean,
    isResultVisible: boolean,
    isAttemptFinished: boolean,
    isLoading: boolean,
    quizzAttemptResult: AttemptWithAnswers
}

const initialState: AttemptState = {
    quizAttempt: null,
    questionsAttempt: [],
    currentQuestion: null,
    counterAccumulated: 0,
    currentQuestionNumber: 0,
    isCorrectAnswer: false,
    isResultVisible: false,
    isAttemptFinished: false,
    isLoading: false,

    quizzAttemptResult: {
        result: null,
        userAnswers: []
    }
}

export const attemptSlice = createSlice({
    name: 'attempt',
    initialState: initialState,
    reducers: {

        addUserAnswer: ( state, { payload }: PayloadAction<CreateUserAnswer>) => {
            state.quizzAttemptResult.userAnswers.push( payload )
        },

        setUserAnswer: ( state, {payload}: PayloadAction<CreateUserAnswer[]>) => {
            state.quizzAttemptResult.userAnswers = payload
        },

        setQuizzAttemptResult: ( state, {payload}: PayloadAction<CreateQuizAttempt | null>) => {
            state.quizzAttemptResult.result = payload
        },

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

        setIsAttemptFinished: ( state, {payload}: PayloadAction<boolean>) => {
            state.isAttemptFinished = payload
        },

        setIsLoading: ( state, {payload}: PayloadAction<boolean> ) => {
            state.isLoading = payload
        },

        incrementCounterAccumulated: ( state, {payload}: PayloadAction<number> ) => {
            state.counterAccumulated += payload
        },

        resetCounterAccumulated: ( state ) => {
            state.counterAccumulated = 0
        },

        resetAttemptState: ( state ) => {
            state.quizAttempt = null
            state.questionsAttempt = []
            state.currentQuestion = null
            state.counterAccumulated = 0
            state.currentQuestionNumber = 0
            state.isCorrectAnswer = false
            state.isResultVisible = false
            state.isAttemptFinished = false
            state.isLoading = false
            state.quizzAttemptResult = {
                result: null,
                userAnswers: []
            }
        }

    }
})

export const {
    addUserAnswer,
    setQuizzAttemptResult,
    setQuizAttempt,
    setQuestionsAttempt,
    setCurrentQuestion,
    setCurrentQuestionNumber,
    setIsLoading,
    incrementCounterAccumulated,
    resetCounterAccumulated,
    setIsCorrectAnswer,
    setIsResultVisible,
    setIsAttemptFinished,
    setUserAnswer,
    resetAttemptState
} = attemptSlice.actions