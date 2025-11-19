import { useNavigate as useRouterNavigate } from "react-router-dom"

export const useNavigate = () => {

    const navigate = useRouterNavigate()

    const goToPage = ( page: string ) => {
        navigate(`/${page}`)
    }

    return {
        goToPage
    }

}