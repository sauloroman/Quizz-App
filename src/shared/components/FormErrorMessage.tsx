import React from 'react'
import { useTheme } from '../hooks'

interface Props {
    errorMessage?: string
}

export const FormErrorMessage: React.FC<Props> = ({ errorMessage }) => {
    const { isDarkTheme } = useTheme()
    
    return (
        <span 
            className={`
                text-right
                block mt-1 text-xs font-medium
                transition-colors duration-200
                ${isDarkTheme 
                    ? 'text-red-400' 
                    : 'text-red-600'
                }
            `}
            role="alert"
        >
            {errorMessage}
        </span>
    )
}