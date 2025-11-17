import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { AuthStatus } from "../../interfaces/auth.interface";
import type { User } from "../../interfaces/quizzly.interface";

interface InitialStateAuth {
    status: AuthStatus,
    isLoading: boolean,
    user: Omit<User, 'password'> | null
}

export const initialState: InitialStateAuth = {
    status: AuthStatus.pending,
    user: null,
    isLoading: false,
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {

        setIsLoading: ( state, {payload}: PayloadAction<boolean> ) => {
            state.isLoading = payload
        },

        login: ( state, {payload}: PayloadAction<Omit<User, 'password'> | null> ) => {
            state.status = AuthStatus.authenticated
            state.user = payload
        },

        logout: ( state ) => {
            state.status = AuthStatus.unauthenticated
            state.user = null
        }

    }
})

export const {
    setIsLoading,
    login,
    logout  
} = authSlice.actions