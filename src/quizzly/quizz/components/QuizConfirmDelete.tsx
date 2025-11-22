import React from 'react'
import { ModalLayout } from '../../../layout/ModalLayout'
import { useModal, useQuiz, useTheme } from '../../../shared/hooks'
import { DangerButton } from '../../../shared/components/DangerButton'
import { OutlineButton } from '../../../shared/components/OutlineButton'

export const QuizConfirmDelete: React.FC = () => {
    const { modal: { isOpen }, onCloseModal } = useModal()
    const { isDarkTheme } = useTheme()
    const { deleteQuiz, quizSelected } = useQuiz()

    if (!quizSelected) return null

    const handleConfirmDelete = () => {
        deleteQuiz( quizSelected.id )
        onCloseModal()
    }

    return (
        <ModalLayout isOpen={isOpen} title='Eliminar Quiz'>
            <div className='space-y-2'>
                
                <p className={`text-center ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
                    ¿Estás seguro de que deseas eliminar este quiz?
                </p>

                <p className={`text-center text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
                    Esta acción no se puede deshacer.
                </p>

                <div className='flex gap-3 pt-4'>
                    <div className='flex-1'>
                        <OutlineButton 
                            onClick={onCloseModal}
                            text='Cancelar'
                        />
                    </div>
                    <div className='flex-1'>
                        <DangerButton 
                            onClick={handleConfirmDelete}
                            text='Eliminar'
                        />
                    </div>
                </div>

            </div>
        </ModalLayout>
    )
}