import React from 'react'
import { useTheme } from '../hooks'

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
    text: string,
    className?: string,
}

export const Label: React.FC<Props> = ({ text, className = '', ...props }) => {
    const { isDarkTheme } = useTheme()
    return (
        <label 
            className={`
                block mb-2
                font-medium text-sm
                transition-colors duration-200
                ${isDarkTheme 
                    ? 'text-gray-200' 
                    : 'text-gray-700'
                }
                ${ className }
            `}
            {...props}
        >
            {text}
        </label>
    )
}