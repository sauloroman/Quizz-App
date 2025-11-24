import React from 'react'

interface Props {
    isDarkTheme: boolean,
}

export const StatsHeader: React.FC<Props> = ({ isDarkTheme }) => {
    return (
        <header className="mb-10">
            <h1
                className={` 
                    font-bold mb-2 tracking-tight
                    text-3xl md:text-4xl
                    ${isDarkTheme ? 'text-white' : 'text-slate-900'}
                `}>
                Tus Estadísticas
            </h1>

            <p className={`text-base md:text-lg ${isDarkTheme ? 'text-slate-400' : 'text-slate-600'}`}>
                Datos obtenidos del uso de la aplicación
            </p>
        </header>
    )
}
