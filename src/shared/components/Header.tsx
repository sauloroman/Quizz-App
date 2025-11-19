import React from 'react'
import { useAuth, useNavigate, useTheme } from '../hooks'
import logoDark from '../../assets/img/logo-dark-mode.png'
import { Link, NavLink } from 'react-router-dom'

interface Props {
    title: string
}

export const Header: React.FC<Props> = ({ title }) => {

    const { isDarkTheme, activateDarkTheme, activateLightTheme } = useTheme()
    const { logoutUser } = useAuth()
    const { returnPage } = useNavigate()

    const toggleTheme = () => {
        if (isDarkTheme) {
            activateLightTheme()
        } else {
            activateDarkTheme()
        }
    }

    return (
        <header className={`
                    flex justify-between items-center
                    px-6 py-2 shadow-md
                    transition-colors duration-200 
                    ${isDarkTheme
                ? 'bg-[#2c3e50]'
                : 'bg-white'
            } 
                `}>
            <div className='flex gap-3 items-center'>
                <img
                    className='h-10'
                    src={isDarkTheme ? logoDark : ''}
                    alt='Quizzly App'
                />
                <div className='flex items-center gap-2'>
                    <NavLink to={"/"} className={`flex items-center justify-center`}>
                        <i className={`bx bxs-home ${isDarkTheme ? 'text-white' : 'text-gray-800'} text-xl`}></i>
                    </NavLink>
                    <button onClick={returnPage} className='flex items-center cursor-pointer justify-center'>
                        <i className={`bx bx-chevron-left ${isDarkTheme ? 'text-white' : 'text-gray-800'} text-xl`}></i>
                    </button>
                    <h2 className={`font-bold ${isDarkTheme ? 'text-gray-100' : 'text-gray-800'}`}>{title}</h2>
                </div>
            </div>

            <div className='flex items-center gap-4'>
                <button
                    onClick={toggleTheme}
                    className={`
                                cursor-pointer
                                p-2 rounded-lg
                                transition-all duration-200
                                flex items-center justify-center
                                ${isDarkTheme
                            ? 'bg-gray-600 hover:bg-gray-700 text-yellow-300'
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                        }
                            `}
                    aria-label={isDarkTheme ? 'Activar modo claro' : 'Activar modo oscuro'}
                >
                    <i className={`bx bx-${isDarkTheme ? 'sun' : 'moon'} text-xl`}></i>
                </button>

                <button
                    onClick={logoutUser}
                    className={`
                        px-4 py-2 rounded-lg font-semibold
                        border-2
                        transition-all duration-200
                        ${isDarkTheme
                            ? 'border-red-400 text-red-400 hover:bg-red-600 hover:text-white'
                            : 'border-red-500 text-red-600 hover:bg-red-500 hover:text-white'
                        }
                    `}
                >
                    Cerrar Sesión
                </button>
            </div>
        </header>
    )
}
