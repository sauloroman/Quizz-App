import React from 'react'
import { useAttempt, useModal, useTheme } from '../../../shared/hooks'
import { AttemptStats } from './AttemptStats'
import { SubmitButton } from '../../../shared/components/SubmitButton'
import { ModalNames } from '../../../interfaces/ui.interface'

export const AttemptQuizInfo: React.FC = () => {
    const { isDarkTheme } = useTheme()
    const { quizAttempt } = useAttempt()
    const { onOpenModal } = useModal()

    if (!quizAttempt) return null

    return (
        <div className={`
            rounded-2xl border overflow-hidden mb-5
            transition-all duration-300
            ${isDarkTheme 
                ? 'bg-linear-to-br from-gray-800 to-gray-900 border-gray-700 shadow-2xl shadow-gray-900/50' 
                : 'bg-linear-to-br from-white to-gray-50 border-gray-200 shadow-xl shadow-gray-200/50'
            }
        `}>
            <div className="h-1.5 w-full transition-all" style={{ backgroundColor: quizAttempt.color }}/>
            <div className='p-6 space-y-4'>
                <header className='flex justify-between items-center'>
                    <h1 className={`text-xl font-bold leading-tight ${isDarkTheme ? 'text-gray-100' : 'text-gray-900'}`}>{quizAttempt.title}</h1>
                    <div className="w-fit"><SubmitButton className='text-sm' onClick={() => onOpenModal(ModalNames.confirmFinishAttempt)} text='Finalizar Intento' /></div>
                </header>
                <div className={`
                    flex items-center gap-4 py-2 px-6 rounded-lg
                    ${isDarkTheme 
                        ? 'bg-gray-700/40 border border-gray-600' 
                        : 'bg-gray-100 border border-gray-200'
                    }
                `}>
                    <AttemptStats isDarkTheme={isDarkTheme}/>
                </div>
            </div>
        </div>
    )
}