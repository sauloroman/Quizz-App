import { configureStore, type Action, type ThunkAction } from "@reduxjs/toolkit";
import { uiSlice } from "./ui/ui.slice";
import { authSlice } from "./auth/auth.slice";

export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        auth: authSlice.reducer
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