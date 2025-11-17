import { useDispatch, useSelector } from "react-redux"
import { setTheme } from "../../store/ui/ui.slice"
import type { RootState } from "../../store"
import { Theme } from "../../interfaces/ui.interface"

export const useTheme = () => {

    const dispatch = useDispatch<any>()
    const { theme } = useSelector( (state: RootState) => state.ui )

    const activateLightTheme = () => {
        dispatch( setTheme(Theme.light) )
    }

    const activateDarkTheme = () => {
        dispatch( setTheme(Theme.dark) )
    }

    return {
        theme,
        isDarkTheme: theme === Theme.dark,

        activateDarkTheme,
        activateLightTheme
    }

}