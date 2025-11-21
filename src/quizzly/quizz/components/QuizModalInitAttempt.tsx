import React from 'react'
import { ModalLayout } from '../../../layout/ModalLayout'
import { useAttempt, useModal, useNavigate, useQuiz, useTheme } from '../../../shared/hooks'
import { OutlineButton } from '../../../shared/components/OutlineButton'
import { SubmitButton } from '../../../shared/components/SubmitButton'

export const QuizModalInitAttempt: React.FC = () => {
    const { modal: { isOpen: modalIsOpen }, onCloseModal } = useModal()
    const { onSetQuizAttempt } = useAttempt()
    const { isDarkTheme } = useTheme()
    const { quizSelected } = useQuiz()
    const { goToPage } = useNavigate()
    
    if ( !quizSelected ) return null

    const onInitAttempt = () => {
        onSetQuizAttempt( quizSelected.id )
        goToPage(`attempt/${quizSelected.id}`)
        onCloseModal()
    }

    return (
        <ModalLayout isOpen={modalIsOpen} title='Iniciar intento'>
            <div className='flex justify-center items-center mb-5 flex-col gap-2'>
                <i className={`bx bx-play-circle text-5xl ${
                    isDarkTheme ? 'text-blue-400' : 'text-blue-600'
                }`}></i>
                <p className={`text-center font-semibold ${
                    isDarkTheme ? 'text-gray-100' : 'text-gray-900'
                }`}>
                    ¿Desea comenzar un intento de este quiz?
                </p>
            </div>
            <div className='flex justify-between items-center gap-3'>
                <div className='flex-1'>
                    <OutlineButton onClick={ onCloseModal } text='Cancelar' />
                </div>
                <div className="flex-1">
                    <SubmitButton onClick={onInitAttempt} text='Comenzar' />
                </div>
            </div>
        </ModalLayout>
    )
}