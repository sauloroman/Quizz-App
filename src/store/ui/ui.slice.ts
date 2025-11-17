import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Theme } from "../../interfaces/ui.interface";

interface UIState {
    theme: Theme
}

const initialState: UIState = {
    theme: Theme.dark
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState: initialState,
    reducers: {

        setTheme: ( state, {payload}: PayloadAction<Theme> ) => {
            if ( !Object.values( Theme ).includes(payload )) throw new Error(`El tema ${payload} no está implementado`)
            state.theme = payload
        }

    }
})

export const {
    setTheme,
} = uiSlice.actions