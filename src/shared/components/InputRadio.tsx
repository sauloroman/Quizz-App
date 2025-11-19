import React from 'react'
import { useTheme } from '../hooks'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    description?: string
}

export const InputRadio: React.FC<Props> = ({ 
    label, 
    description, 
    id,
    ...props 
}) => {
    const { isDarkTheme } = useTheme()
    const inputId = id || `radio-${Math.random().toString(36).substr(2, 9)}`
    
    return (
        <div className="flex items-start gap-3">
            <div className="flex items-center h-6">
                <input
                    id={inputId}
                    type="radio"
                    {...props}
                    className={`w-5 h-5 accent-blue-600 cursor-pointer transition-all ${
                        isDarkTheme
                            ? 'bg-gray-700 border-gray-600'
                            : 'bg-white border-gray-300'
                    }`}
                />
            </div>

            {(label || description) && (
                <label 
                    htmlFor={inputId}
                    className="flex flex-col cursor-pointer flex-1"
                >
                    {label && (
                        <span className={`text-sm font-medium ${
                            isDarkTheme ? 'text-gray-100' : 'text-gray-900'
                        }`}>
                            {label}
                        </span>
                    )}
                    {description && (
                        <span className={`text-xs ${
                            isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                            {description}
                        </span>
                    )}
                </label>
            )}
        </div>
    )
}