import React from 'react'
import { useTheme } from '../hooks'

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
    placeholder: string,
    options: any[],
}

export const Select: React.FC<Props> = ({ options, placeholder, ...props }) => {
    const { isDarkTheme } = useTheme()
        
    return (
        <select
            {...props}
            className={`w-full px-4 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                isDarkTheme
                    ? 'bg-gray-800 border-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
            } ${props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
            {placeholder && (
                <option value="" disabled>
                    {placeholder}
                </option>
            )}
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    )
}