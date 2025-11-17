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