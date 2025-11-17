import React from 'react'
import { Button } from './Button'
import { useTheme } from '../hooks'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string
}

export const OutlineButton: React.FC<Props> = ({ text, ...props }) => {
    const { isDarkTheme } = useTheme()
    
    return (
        <Button 
            text={text}
            className={isDarkTheme 
                ? 'bg-transparent border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white focus:ring-blue-500' 
                : 'bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white focus:ring-blue-400'
            }
            {...props}
        />
    )
}