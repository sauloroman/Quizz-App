import React from 'react'
import { useTheme } from '../../../shared/hooks'
import { QuizzCreateQuestionForm } from './QuizzCreateQuestionForm'

export const QuizzNewQuestionArea: React.FC = () => {

    const { isDarkTheme } = useTheme()

    const containerClasses = `
        rounded-xl border p-5 mb-4 transition-all duration-300 
        ${isDarkTheme 
            ? 'bg-gray-800 border-blue-700/40 shadow-md shadow-black/20' 
            : 'bg-blue-50 border-blue-300 shadow-sm'}
    `

    const iconWrapperClasses = `
        p-2 rounded-full flex items-center justify-center
        ${isDarkTheme ? 'bg-blue-900/40' : 'bg-blue-100'}
    `

    const titleClasses = `
        font-semibold text-lg
        ${isDarkTheme ? 'text-blue-300' : 'text-blue-900'}
    `

    return (
        <section className={containerClasses}>
            <header className="flex items-center gap-3 mb-4">
                <div className={iconWrapperClasses}>
                    <svg
                        className="w-6 h-6 text-blue-600"
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

                <h3 className={titleClasses}>Nueva Pregunta</h3>
            </header>

            <QuizzCreateQuestionForm />
        </section>
    )
}
