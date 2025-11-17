import React from 'react'
import { Button } from './Button'
import { useTheme } from '../hooks'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string
}

export const DangerButton: React.FC<Props> = ({ text, ...props }) => {
    const { isDarkTheme } = useTheme()
    
    return (
        <Button 
            text={text}
            className={isDarkTheme 
                ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' 
                : 'bg-red-500 hover:bg-red-600 focus:ring-red-400'
            }
            {...props}
        />
    )
}