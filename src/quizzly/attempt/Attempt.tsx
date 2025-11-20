import React from 'react'
import {  useTheme } from '../../shared/hooks'
import { AttemptQuizInfo } from './components/AttemptQuizInfo'
import { AttemptQuestion } from './components/AttemptQuestion'

export const Attempt: React.FC = () => {
    const { isDarkTheme } = useTheme()

    return (
        <div className={`
            py-6
            min-h-screen
            transition-colors duration-200
            ${isDarkTheme 
                ? 'bg-[#3d4f5c]'
                : 'bg-gray-50'
            }
        `}>
            <div className="w-95% md:w-[75%] mx-auto">
                <AttemptQuizInfo />
                <AttemptQuestion />
            </div>
        </div>
    )
}
