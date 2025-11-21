export const getMessageAndIcon = ( percentage: number, isDarkTheme: boolean ) => {
        if (percentage === 100) {
            return {
                icon: 'bx-trophy',
                title: '¡Perfecto!',
                message: 'Obtuviste todos los puntos posibles',
                color: isDarkTheme ? 'text-yellow-400' : 'text-yellow-500',
                bg: isDarkTheme ? 'bg-yellow-900/15' : 'bg-yellow-50'
            }
        } else if (percentage >= 80) {
            return {
                icon: 'bx-smile',
                title: '¡Excelente!',
                message: 'Muy buen desempeño',
                color: isDarkTheme ? 'text-green-400' : 'text-green-600',
                bg: isDarkTheme ? 'bg-green-900/15' : 'bg-green-50'
            }
        } else if (percentage >= 60) {
            return {
                icon: 'bx-happy',
                title: 'Bien',
                message: 'Buen trabajo, puedes mejorar',
                color: isDarkTheme ? 'text-blue-400' : 'text-blue-600',
                bg: isDarkTheme ? 'bg-blue-900/15' : 'bg-blue-50'
            }
        } else if (percentage >= 40) {
            return {
                icon: 'bx-meh',
                title: 'Regular',
                message: 'Necesitas practicar más',
                color: isDarkTheme ? 'text-amber-400' : 'text-amber-600',
                bg: isDarkTheme ? 'bg-amber-900/15' : 'bg-amber-50'
            }
        } else {
            return {
                icon: 'bx-sad',
                title: 'Insuficiente',
                message: 'Dedica más tiempo a estudiar',
                color: isDarkTheme ? 'text-red-400' : 'text-red-600',
                bg: isDarkTheme ? 'bg-red-900/15' : 'bg-red-50'
            }
        }
    }