import React from 'react'
import { useTheme } from '../hooks'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string
}

export const Input: React.FC<Props> = ({ className = '', ...props }) => {

    const { isDarkTheme } = useTheme()
    
    return (
        <input 
            className={`
                w-full px-4 py-3 rounded-lg
                font-medium
                transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-opacity-50
                ${isDarkTheme 
                    ? 'bg-[#3d4f5c] text-white placeholder-gray-400 focus:ring-blue-400' 
                    : 'bg-gray-100 text-gray-900 placeholder-gray-500 focus:ring-blue-500'
                }
                ${className}
            `}
            {...props}
        />
    )
}