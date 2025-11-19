import React from 'react'
import type { User } from '../../../interfaces/quizzly.interface'
import { useTheme } from '../../../shared/hooks'
import { formatDate } from '../../../shared/helpers/format-date'

interface Props {
    user: Omit<User, 'password'>,
    description: string,
    subject: string,
    color: string,
    createdAt: Date,
    updatedAt: Date
}

export const QuizzInfo: React.FC<Props> = ({ 
    user,
    description,
    subject,
    color,
    createdAt,
    updatedAt
}) => {

    const { isDarkTheme } = useTheme()

    return (
        <div className={`top-20 rounded-lg border transition-colors ${
            isDarkTheme
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
        }`}>
            <div 
                className="h-2 w-full"
                style={{ backgroundColor: color }}
            />

            <div className="p-4 space-y-4">                
                <div className="flex items-center gap-3">
                    <div 
                        className="w-12 h-12 rounded-full bg-linear-to-br flex items-center justify-center text-white font-bold text-lg"
                        style={{
                            backgroundImage: `linear-gradient(135deg, ${color}, ${color}CC)`
                        }}
                    >
                        {user?.name?.charAt(0).toUpperCase() ?? 'U'}
                    </div>
                    <div className="flex-1">
                        <p className={`text-sm font-semibold ${
                            isDarkTheme ? 'text-gray-100' : 'text-gray-900'
                        }`}>
                            {user?.name ?? 'Usuario desconocido'}
                        </p>
                        <p className={`text-xs ${
                            isDarkTheme ? 'text-gray-500' : 'text-gray-500'
                        }`}>
                            Autor
                        </p>
                    </div>
                </div>

                <div className={`h-px ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />

                <div>
                    <p className={`text-xs font-semibold mb-2 ${
                        isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                        ASIGNATURA
                    </p>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        isDarkTheme ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                    }`}>
                        {subject}
                    </span>
                </div>

                <div>
                    <p className={`text-xs font-semibold mb-2 ${
                        isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                        DESCRIPCIÓN
                    </p>
                    <p className={`text-sm line-clamp-3 ${
                        isDarkTheme ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                        {description}
                    </p>
                </div>

                <div className={`h-px ${ isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />

                <div className="space-y-3">
                    <div>
                        <p className={`text-xs font-semibold mb-1 ${
                            isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                            CREADO
                        </p>
                        <p className={`text-sm ${
                            isDarkTheme ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                            {formatDate(createdAt)}
                        </p>
                    </div>

                    <div>
                        <p className={`text-xs font-semibold mb-1 ${
                            isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                            ACTUALIZADO
                        </p>
                        <p className={`text-sm ${
                            isDarkTheme ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                            {formatDate(updatedAt)}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}