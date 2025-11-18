import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import { ModalNames } from "../../interfaces/ui.interface"
import { setModal } from "../../store/ui/ui.slice"

export const useModal = () => {

    const dispatch = useDispatch<any>()
    const { modal } = useSelector( (state: RootState) => state.ui)

    const onOpenModal = ( name: ModalNames ) => {
        dispatch(setModal({
            isOpen: true,
            name: name,
        }))
    }

    const onCloseModal = () => {
        dispatch(setModal({
            isOpen: false,
            name: ModalNames.pending
        }))
    }

    return {
        modal,

        onOpenModal,
        onCloseModal,
    }
}