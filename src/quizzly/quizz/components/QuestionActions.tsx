import React from 'react'
import { IconButton } from '../../../shared/components/IconButton'
import { useModal } from '../../../shared/hooks'
import { ModalNames } from '../../../interfaces/ui.interface'
import { useQuestion } from '../../../shared/hooks/useQuestion'

interface Props {
    questionId: string,
    isDarkTheme: boolean,
    isOpen: boolean,
    toggleAccordion: () => void
}

export const QuestionActions: React.FC<Props> = ({ questionId, isOpen, toggleAccordion, isDarkTheme }) => {

    const { onSetQuestionSelected } = useQuestion()
    const { onOpenModal } = useModal()

    const onEditQuestion = () => {
        onSetQuestionSelected(questionId)
        onOpenModal(ModalNames.editQuestion)
    }

    const onDeleteQuestion = () => {
        onSetQuestionSelected(questionId)
        onOpenModal(ModalNames.deleteQuestion)
    }

    return (
        <div className="flex gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
            <IconButton onClick={onEditQuestion}>
                <i className={`bx bx-edit ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}></i>
            </IconButton>
            <IconButton onClick={onDeleteQuestion}>
                <i className={`bx bx-trash ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}></i>
            </IconButton>
            <IconButton onClick={toggleAccordion}>
                <i className={`bx bx-${isOpen ? 'chevron-up' : 'chevron-down'} ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}></i>
            </IconButton>
        </div>
    )
}
