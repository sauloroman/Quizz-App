export type Theme = 'light' | 'dark'
export const Theme = {
    light: 'light' as Theme,
    dark: 'dark' as Theme,
}

export type AlertType = 'success' | 'error' | 'warning'
export const AlertType = {
    success: 'success' as AlertType,
    error: 'error' as AlertType,
    warning: 'warning' as AlertType,
}
export interface Alert {
    isOpen: boolean,
    type: AlertType,
    title: string,
    text: string
}

export interface MenuOption {
    icon: string,
    name: string,
    color: string,
    link: string,
}

export type ModalNames = 
'confirmDeleteQuizz' | 
'confirmFinishAttempt' |
'attemptFinished' |
'confirmInitAttempt' |
'editQuestion' |
'pending' 

export const ModalNames = {
    confirmDeleteQuizz: 'confirmDeleteQuizz' as ModalNames,
    confirmFinishAttempt: 'confirmFinishAttempt' as ModalNames,
    attemptFinished: 'attemptFinished' as ModalNames,
    confirmInitAttempt: 'confirmInitAttempt' as ModalNames,
    editQuestion: 'editQuestion' as ModalNames,
    deleteQuestion: 'deleteQuestion' as ModalNames, 
    pending: 'pending' as ModalNames,
}

export interface Modal {
    isOpen: boolean,
    name: ModalNames,
}