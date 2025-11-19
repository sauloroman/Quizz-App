import { useNavigate as useRouterNavigate } from "react-router-dom"

export const useNavigate = () => {

    const navigate = useRouterNavigate()

    const returnPage = () => {
        navigate(-1)
    }

    const goToPage = ( page: string ) => {
        navigate(`/${page}`)
    }

    return {
        goToPage,
        returnPage,
    }

}