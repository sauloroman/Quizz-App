import React from 'react'
import { useTheme } from '../hooks'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode,
    className?: string,
}

export const IconButton: React.FC<Props> = ({ children, className='', ...props }) => {
    const { isDarkTheme } = useTheme()

    return (
        <button
            {...props}
            className={`flex justify-center items-center cursor-pointer p-2 rounded-lg transition-colors ${
                isDarkTheme
                    ? 'text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            } ${className}`}
        >
            {children}
        </button>
    )
}