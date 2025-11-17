import React from 'react'
import { Button } from './Button'
import { useTheme } from '../hooks'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string
}

export const CancelButton: React.FC<Props> = ({ text, ...props }) => {
    const { isDarkTheme } = useTheme()
    return (
        <Button 
            text={text}
            className={isDarkTheme 
                ? 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500' 
                : 'bg-gray-400 hover:bg-gray-500 focus:ring-gray-300'
            }
            {...props}
        />
    )
}