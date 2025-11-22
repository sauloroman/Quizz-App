import React from 'react'
import { ModalLayout } from '../../../layout/ModalLayout'
import { useModal, useQuiz, useTheme } from '../../../shared/hooks'
import { useQuestion } from '../../../shared/hooks/useQuestion'
import { OutlineButton } from '../../../shared/components/OutlineButton'
import { DangerButton } from '../../../shared/components/DangerButton'

export const QuestionConfirmDelete: React.FC = () => {
    const { modal: { isOpen }, onCloseModal } = useModal()
    const { questionSelected, deleteQuestionInQuiz } = useQuestion()
    const { quizSelected } = useQuiz()
    const { isDarkTheme } = useTheme()

    if (!questionSelected || !quizSelected ) return null

    const onConfirmDelete = () => {
        deleteQuestionInQuiz( quizSelected.id, questionSelected.question.id )
        onCloseModal()
    }

    const textSecondaryClass = isDarkTheme ? 'text-gray-400' : 'text-gray-600'

    return (
        <ModalLayout className='w-lg' isOpen={isOpen} title='Eliminar Pregunta'>
            <div className='space-y-6'>
                <div>
                    <p className={`text-sm ${textSecondaryClass} text-center`}>
                        ¿Estás seguro de que deseas eliminar esta pregunta? <br /> Esta acción no se puede deshacer.
                    </p>
                </div>

                <div className='flex gap-3 pt-2'>
                    <div className="flex-1">
                        <OutlineButton 
                            text='Cancelar'
                            onClick={onCloseModal}
                        />
                    </div>
                    <div className="flex-1">
                        <DangerButton 
                            text='Eliminar'
                            onClick={onConfirmDelete}
                        />
                    </div>
                </div>
            </div>
        </ModalLayout>
    )
}