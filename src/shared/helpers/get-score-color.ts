export const getScoreColor = (percentage: number, isDarkTheme: boolean) => {
    if (percentage >= 80) return isDarkTheme ? 'text-green-400' : 'text-green-600'
    if (percentage >= 60) return isDarkTheme ? 'text-yellow-400' : 'text-yellow-600'
    return isDarkTheme ? 'text-red-400' : 'text-red-600'
}

export const getScoreBgColor = (percentage: number, isDarkTheme: boolean ) => {
    if (percentage >= 80) return isDarkTheme ? 'bg-green-900/30' : 'bg-green-100'
    if (percentage >= 60) return isDarkTheme ? 'bg-yellow-900/30' : 'bg-yellow-100'
    return isDarkTheme ? 'bg-red-900/30' : 'bg-red-100'
}