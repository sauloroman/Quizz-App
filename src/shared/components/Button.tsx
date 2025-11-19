import React from 'react'
import { useTheme } from '../hooks'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string,
    submit?: boolean,
    className?: string,
}

export const Button: React.FC<Props> = ({ text, submit = false, className = '', ...props }) => {
    const { isDarkTheme } = useTheme()
    
    return (
        <button 
            type={ submit ? 'submit' : 'button' }
            className={`
                cursor-pointer
                w-full px-6 py-3 rounded-lg
                font-semibold
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-offset-2
                disab   led:opacity-50 disabled:cursor-not-allowed
                ${isDarkTheme 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 focus:ring-offset-[#2c3e50]' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-400 focus:ring-offset-white'
                }
                ${className}
            `}
            {...props}
        >
            {text}
        </button>
    )
}