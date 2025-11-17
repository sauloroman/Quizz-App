import React from 'react'
import { Button } from './Button'
import { useTheme } from '../hooks'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string
}

export const SuccessButton: React.FC<Props> = ({ text, ...props }) => {
    const { isDarkTheme } = useTheme()
    
    return (
        <Button 
            text={text}
            className={isDarkTheme 
                ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500' 
                : 'bg-green-500 hover:bg-green-600 focus:ring-green-400'
            }
            {...props}
        />
    )
}