import React from 'react'
import { Button } from './Button'
import { useTheme } from '../hooks'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string
    submit?: boolean
}

export const SubmitButton: React.FC<Props> = ({ text, submit = false, ...props }) => {
    const { isDarkTheme } = useTheme()
    
    return (
        <Button 
            submit
            text={text}
            className={isDarkTheme 
                ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500' 
                : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-400'
            }
            {...props}
        />
    )
}