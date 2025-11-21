import React from 'react'
import {  useAttempt, useModal, useTheme } from '../../shared/hooks'
import { AttemptQuizInfo } from './components/AttemptQuizInfo'
import { AttemptQuestion } from './components/AttemptQuestion'
import { ModalNames } from '../../interfaces/ui.interface'
import { ModalConfirmFinishedAttempt } from './components/ModalConfirmFinishedAttempt'
import { AttemptSummary } from './components/AttemptSummary'

export const Attempt: React.FC = () => {
    const { isDarkTheme } = useTheme()
    const { isAttemptFinished } = useAttempt()
    const { modal: { isOpen: modalIsOpen, name: modalName }} = useModal()

    return (
        <>
            {
                isAttemptFinished
                ? ( <AttemptSummary />)
                : (
                    <>
                        <div className={`
                            py-6
                            min-h-screen
                            transition-colors duration-200
                            ${isDarkTheme ? 'bg-[#3d4f5c]' : 'bg-gray-50'}
                        `}>
                            <div className="w-95% md:w-[75%] mx-auto">
                                <AttemptQuizInfo />
                                <AttemptQuestion />
                            </div>
                        </div>
                        { modalIsOpen && modalName === ModalNames.confirmFinishAttempt && <ModalConfirmFinishedAttempt />}
                    </>
                )
            }
        </>
    )
}
