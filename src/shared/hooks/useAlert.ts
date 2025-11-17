import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import { AlertType } from "../../interfaces/ui.interface"
import { setAlert } from "../../store/ui/ui.slice"

export const useAlert = () => {
    const dispatch = useDispatch<any>()
    const { isOpen, text, title, type } = useSelector( (state: RootState) => state.ui.alert )

    const showAlert = ( title: string, text: string, type: AlertType ) => {
        dispatch( setAlert({
            isOpen: true,
            title,
            text,
            type
        }))
    }

    const closeAlert = () => {
        dispatch(setAlert({
            isOpen: false,
            title: '',
            text: '',
            type: AlertType.warning
        }))
    }

    return {
        isOpen,
        text,
        title,
        type,

        showAlert,
        closeAlert,
    }
}