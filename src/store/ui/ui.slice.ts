import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { AlertType, ModalNames, Theme, type Alert, type Modal } from "../../interfaces/ui.interface";

interface UIState {
    theme: Theme,
    alert: Alert,
    modal: Modal,
}

const initialState: UIState = {
    theme: Theme.dark,
    alert: {
        isOpen: false,
        text: '',
        title: '',
        type: AlertType.warning
    },
    modal: {
        isOpen: false,
        name: ModalNames.pending
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
        },

        setModal: ( state, { payload }: PayloadAction<Modal>) => {
            state.modal = payload
        },

        resetUIState: ( state ) => {
            state.theme = Theme.dark
            state.alert = {
                isOpen: false,
                text: '',
                title: '',
                type: AlertType.warning
            },
            state.modal = {
                isOpen: false,
                name: ModalNames.pending
            }
        }

    }
})

export const {
    setTheme,
    setAlert,
    setModal,
    resetUIState
} = uiSlice.actions