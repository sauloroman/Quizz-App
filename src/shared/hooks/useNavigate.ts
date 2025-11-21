import { useNavigate as useRouterNavigate } from "react-router-dom"

export const useNavigate = () => {

    const navigate = useRouterNavigate()

    const returnPage = () => {
        navigate(-1)
    }

    const goToPage = (page: string, queryParams?: Record<string, string | number | boolean>) => {
        const queryString = queryParams 
            ? '?' + new URLSearchParams(Object.entries(queryParams).map(([key, value]) => [key, String(value)])).toString()
            : ''
        
        navigate(`/${page}${queryString}`)
    }

    return {
        goToPage,
        returnPage,
    }

}