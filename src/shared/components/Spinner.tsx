import React from 'react'
import { useTheme } from '../hooks'

export const Spinner: React.FC = () => {
    const { isDarkTheme } = useTheme()

    return (
        <div className="flex items-center justify-center">
            <div 
                className={`
                    w-12 h-12 
                    border-4 border-solid rounded-full
                    animate-spin
                    ${isDarkTheme 
                        ? 'border-blue-500 border-t-transparent' 
                        : 'border-blue-600 border-t-transparent'
                    }
                `}
            ></div>
        </div>
    )
}