import { configureStore, type Action, type ThunkAction } from "@reduxjs/toolkit";
import { uiSlice } from "./ui/ui.slice";

export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer
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