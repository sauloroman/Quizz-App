import React from 'react'
import { useModal, useNavigate, useTheme } from '../../../shared/hooks'
import { SubmitButton } from '../../../shared/components/SubmitButton'
import { ModalNames } from '../../../interfaces/ui.interface'

interface Action {
    icon: string
    label: string
    onClick?: () => void
}

interface Props {
    quizId: string,
    quizColor: string
}

export const QuizzActions: React.FC<Props> = ({ quizId, quizColor }) => {
    const { isDarkTheme } = useTheme()
    const { goToPage } = useNavigate()
    const { onOpenModal } = useModal()

    const actions: Action[] = [
        {
            icon: 'bxr bx-pencil',
            label: 'Editar',
            onClick: () => goToPage(`edit-quizz/${quizId}`)
        },
        {
            icon: 'bxr bx-trash',
            label: 'Eliminar',
            onClick: () => onOpenModal(ModalNames.confirmDeleteQuizz)
        }
    ]

    return (
        <div className={`mt-5 border transition-colors ${
            isDarkTheme
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
        } overflow-hidden`}>
            <div 
                className="h-2 w-full"
                style={{ backgroundColor: quizColor }}
            />

            <div className="p-4 space-y-4">
                <p className={`text-xs font-semibold ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>ACCIONES</p>

                <div className="space-y-2">
                    {actions.map((action, index) => (
                        <button
                            key={index}
                            onClick={action.onClick}
                            className={`cursor-pointer w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                isDarkTheme
                                    ? 'hover:bg-gray-700 text-gray-300 hover:text-gray-100'
                                    : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900'
                            }`}
                        >
                            <i className={`${action.icon} text-xl`}></i>
                            <span className="text-sm font-medium">{action.label}</span>
                        </button>
                    ))}
                    <SubmitButton onClick={() => onOpenModal(ModalNames.confirmInitAttempt)} text='Estudiar Quiz'/>
                </div>
            </div>
        </div>
    )
}