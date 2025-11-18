import React from 'react'
import type { MenuOption } from '../../../interfaces/ui.interface'
import { useTheme } from '../../../shared/hooks'
import { Link } from 'react-router-dom'

const menuOptions: MenuOption[] = [
    {
        color: '#3B82F6', 
        icon: 'bx-book-content',
        name: 'Tus Quizzes',
        link: '/quizzes'
    },
    {
        color: '#10B981', 
        icon: 'bx-plus-circle',
        name: 'Crear Quiz',
        link: '/create-quizz'
    },
    {
        color: '#F59E0B', 
        icon: 'bx-timer',
        name: 'Intentos',
        link: '/attempts'
    },
    {
        color: '#8B5CF6',
        icon: 'bx-bar-chart',
        name: 'Estadísticas',
        link: '/stats'
    },
]

export const Menu: React.FC = () => {
    const { isDarkTheme } = useTheme()
        
    return (
        <div className={`
            rounded-lg p-8
            transition-colors duration-200
            ${isDarkTheme 
                ? 'bg-[#2c3e50]' 
                : 'bg-white'
            }
        `}>
            <h2 className={`
                text-2xl font-bold mb-6
                ${isDarkTheme 
                    ? 'text-white' 
                    : 'text-gray-900'
                }
            `}>
                Menú de Opciones
            </h2>
            
            <ul className='grid grid-cols-1 gap-4'>
                {menuOptions.map((option: MenuOption, i) => (
                    <li key={`${option.name}-${i}`}>
                        <Link
                            to={option.link}
                            className={`
                                cursor-pointer
                                w-full flex items-center gap-4
                                p-4 rounded-lg
                                transition-all duration-200
                                ${isDarkTheme 
                                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                                    : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
                                }
                                hover:shadow-lg hover:scale-105
                                focus:outline-none focus:ring-2 focus:ring-offset-2
                            `}
                        >
                            <div 
                                className='flex items-center justify-center w-12 h-12 rounded-lg'
                                style={{ backgroundColor: option.color + '20' }}
                            >
                                <i 
                                    className={`bx ${option.icon} text-3xl`}
                                    style={{ color: option.color }}
                                ></i>
                            </div>
                            
                            <span className='font-semibold text-lg'>
                                {option.name}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}