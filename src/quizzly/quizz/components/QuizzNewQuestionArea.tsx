import React from 'react'
import { useTheme } from '../../../shared/hooks'
import { QuizzCreateQuestionForm } from './QuizzCreateQuestionForm'

export const QuizzNewQuestionArea: React.FC = () => {
    const { isDarkTheme } = useTheme()
    
    return (
        <section className={`rounded-lg border transition-colors p-5 mb-4 ${
            isDarkTheme
                ? 'bg-gray-800 border-blue-600/50'
                : 'bg-blue-50 border-blue-300'
        }`}>
            <div className="flex items-center gap-2 mb-4">
                <div className={`p-2 rounded-full ${
                    isDarkTheme ? 'bg-blue-900/50' : 'bg-blue-100'
                }`}>
                    <svg 
                        className="w-5 h-5 text-blue-600" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M12 4v16m8-8H4" 
                        />
                    </svg>
                </div>
                <h3 className={`font-semibold ${
                    isDarkTheme ? 'text-blue-300' : 'text-blue-900'
                }`}>
                    Nueva Pregunta
                </h3>
            </div>
            
            <QuizzCreateQuestionForm />
        </section>
    )
}