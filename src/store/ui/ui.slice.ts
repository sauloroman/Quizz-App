import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { AlertType, Theme, type Alert } from "../../interfaces/ui.interface";

interface UIState {
    theme: Theme,
    alert: Alert,
}

const initialState: UIState = {
    theme: Theme.dark,
    alert: {
        isOpen: true,
        text: '',
        title: '',
        type: AlertType.warning
    }
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState: initialState,
    reducers: {

        setTheme: ( state, {payload}: PayloadAction<Theme> ) => {
            if ( !Object.values( Theme ).includes(payload )) throw new Error(`El tema ${payload} no está implementado`)
            state.theme = payload
        },

        setAlert: ( state, { payload }: PayloadAction<Alert> ) => {
            state.alert = payload
        }

    }
})

export const {
    setTheme,
    setAlert,
} = uiSlice.actions