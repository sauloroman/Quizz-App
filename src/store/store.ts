import { configureStore, type Action, type ThunkAction } from "@reduxjs/toolkit";
import { uiSlice } from "./ui/ui.slice";
import { authSlice } from "./auth/auth.slice";
import { quizzeSlice } from "./quizzes/quizzes.slice";
import { questionsSlice } from "./questions/questions.slice";
import { attemptSlice } from "./attempt/attempt.slice";
import { attemptsSlice } from "./attempts/attempts.slice";
import { statsSlice } from "./stats/stats.slice";

export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        auth: authSlice.reducer,
        quizzes: quizzeSlice.reducer,
        questions: questionsSlice.reducer,
        attempt: attemptSlice.reducer,
        attempts: attemptsSlice.reducer,
        stats: statsSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>