import React from 'react'
import { ModalLayout } from '../../../layout/ModalLayout'
import { useAttempt, useModal, useTheme } from '../../../shared/hooks'
import { OutlineButton } from '../../../shared/components/OutlineButton'
import { DangerButton } from '../../../shared/components/DangerButton'

export const ModalConfirmFinishedAttempt: React.FC = () => {
    const { modal: { isOpen }, onCloseModal } = useModal()
    const { isDarkTheme } = useTheme()
    const { onSetIsAttemptFinished, quizAttempt } = useAttempt()

    if ( !quizAttempt ) return

    const onFinishAttempt = () => {
        onSetIsAttemptFinished(true)
        onCloseModal()
    }

    return (
        <ModalLayout title='Terminar Intento' isOpen={isOpen}>
            <div className='space-y-6 p-2'>
                <div className={`flex gap-3 p-4 rounded-lg ${isDarkTheme
                        ? 'bg-red-900/15 text-red-200'
                        : 'bg-red-50 text-red-700'
                    }`}>
                    <i className={`bxr bx-error-circle text-lg ${isDarkTheme ? 'text-red-400' : 'text-red-600'}`}></i>
                    <p className='font-medium'>¿Desea terminar el intento?</p>
                </div>

                <div className='space-y-2'>
                    <li className={`flex gap-3 p-3 rounded-lg ${isDarkTheme
                            ? 'bg-gray-800/40 text-gray-300'
                            : 'bg-gray-50 text-gray-700'
                        }`}>
                        <i className={`bxr bx-trash text-lg ${isDarkTheme ? 'text-red-400' : 'text-red-500'}`}></i>
                        <span>Perderá todo el progreso realizado</span>
                    </li>
                    <li className={`flex gap-3 p-3 rounded-lg ${isDarkTheme
                            ? 'bg-gray-800/40 text-gray-300'
                            : 'bg-gray-50 text-gray-700'
                        }`}>
                        <i className={`bxr bx-time text-lg ${isDarkTheme ? 'text-amber-400' : 'text-amber-500'}`}></i>
                        <span>Se guardará con puntaje de 0</span>
                    </li>
                </div>

                <div className='flex gap-2 pt-2'>
                    <div className='flex-1'><OutlineButton text='Cancelar' onClick={onCloseModal} /></div>
                    <div className='flex-1'><DangerButton text='Terminar' onClick={onFinishAttempt} /></div>
                </div>
            </div>
        </ModalLayout>
    )
}