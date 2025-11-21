import React, { useState } from 'react'
import type { QuestionWithAnswers } from '../../../interfaces/quizzly.interface'
import { useTheme } from '../../../shared/hooks'
import { QuestionAccordion } from './QuestionAccordion'
import { QuestionActions } from './QuestionActions'

interface Props {
    question: QuestionWithAnswers,
    index: number
}   

export const QuestionListItem: React.FC<Props> = ({ question, index }) => {
    const { isDarkTheme } = useTheme()
    const [isOpen, setIsOpen] = useState(false)

    const toggleAccordion = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div
            className={`rounded-lg border transition-colors ${isDarkTheme
                ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
        >
            <div
                onClick={toggleAccordion}
                className="p-5 cursor-pointer"
            >
                <div className="flex items-start gap-4">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm shrink-0 ${isDarkTheme
                        ? 'bg-gray-700 text-gray-300'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                        {index + 1}
                    </div>

                    <div className="flex-1 min-w-0">
                        <h4 className={`text-base font-semibold mb-2 wrap-break-words ${isDarkTheme ? 'text-gray-100' : 'text-gray-900'}`}>{question.question.questionText}</h4>

                        <div className="flex items-center gap-3 flex-wrap">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${isDarkTheme
                                ? 'bg-gray-700 text-gray-300'
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                                {question.question.points} {question.question.points === 1 ? 'punto' : 'puntos'}
                            </span>
                        </div>
                    </div>

                    <QuestionActions 
                        questionId={question.question.id}
                        isDarkTheme={isDarkTheme}
                        isOpen={isOpen}
                        toggleAccordion={toggleAccordion}
                    />
                </div>
                <QuestionAccordion 
                    isDarkTheme={isDarkTheme}
                    answers={question.answers}
                    isOpen={isOpen}
                />
            </div>

        </div>
    )
}