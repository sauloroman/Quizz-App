import React from 'react'
import { IconButton } from '../../../shared/components/IconButton'

interface Props {
    isDarkTheme: boolean,
    isOpen: boolean,
    toggleAccordion: () => void
}

export const QuestionActions: React.FC<Props> = ({ isOpen, toggleAccordion, isDarkTheme }) => {
    return (
        <div className="flex gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
            <IconButton>
                <i className={`bx bx-edit ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}></i>
            </IconButton>
            <IconButton>
                <i className={`bx bx-trash ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}></i>
            </IconButton>
            <IconButton onClick={toggleAccordion}>
                <i className={`bx bx-${isOpen ? 'chevron-up' : 'chevron-down'} ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}></i>
            </IconButton>
        </div>
    )
}
