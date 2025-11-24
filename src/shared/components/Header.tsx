import React from 'react'
import { useAuth, useTheme } from '../hooks'
import logoDark from '../../assets/img/logo-dark-mode.png'
import { NavLink } from 'react-router-dom'

interface Props {
    title: string
}

export const Header: React.FC<Props> = ({ title }) => {

    const { isDarkTheme, activateDarkTheme, activateLightTheme } = useTheme()
    const { logoutUser } = useAuth()

    const toggleTheme = () => {
        isDarkTheme ? activateLightTheme() : activateDarkTheme()
    }

    return (
        <header
            className={`
                sticky top-0 z-50
                flex justify-between items-center
                px-4 py-2 
                transition-all duration-300
                backdrop-blur-md
                border-b
                ${isDarkTheme
                    ? 'bg-gray-900/80 border-gray-800 shadow-2xl shadow-black/20'
                    : 'bg-white/80 border-gray-200 shadow-lg shadow-gray-200/20'
                }
            `}
        >

            <div className='flex items-center gap-3 sm:gap-4'>

                <img
                    className='h-8 sm:h-9 transition-transform hover:scale-105'
                    src={isDarkTheme ? logoDark : ''}
                    alt='Quizzly App'
                />

                <div className={`h-5 sm:h-6 w-px ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-300'}`}></div>

                <div className='flex items-center gap-1 sm:gap-2'>
                    <NavLink
                        to="/"
                        className={`
                            cursor-pointer p-2 rounded-lg
                            transition-all duration-200
                            ${isDarkTheme
                                ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                            }
                        `}
                    >
                        <i className='bx bxs-home text-xl sm:text-lg'></i>
                    </NavLink>
                    <h2
                        className={`
                            hidden sm:block font-semibold text-base ml-2
                            ${isDarkTheme ? 'text-gray-200' : 'text-gray-900'}
                        `}
                    >
                        {title}
                    </h2>
                </div>
            </div>

            <div className='flex items-center gap-2 sm:gap-3'>

                <button
                    onClick={toggleTheme}
                    className={`
                        cursor-pointer p-2 sm:p-2.5 rounded-lg
                        transition-all duration-200 flex items-center justify-center
                        backdrop-blur-sm
                        ${isDarkTheme
                            ? 'bg-linear-to-br from-gray-800 to-gray-800/50 hover:from-gray-700 hover:to-gray-700/50 text-amber-400 hover:text-amber-300 border border-gray-700 hover:border-gray-600'
                            : 'bg-linear-to-br from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 text-amber-500 hover:text-amber-600 border border-gray-200 hover:border-gray-300'
                        }
                    `}
                >
                    <i className={`bx bx-${isDarkTheme ? 'sun' : 'moon'} text-lg`}></i>
                </button>

                <button
                    onClick={logoutUser}
                    className={`
                        cursor-pointer
                        px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-semibold text-xs sm:text-sm
                        transition-all duration-200 flex items-center gap-1 sm:gap-2
                        backdrop-blur-sm
                        ${isDarkTheme
                            ? 'bg-linear-to-r from-red-500/20 to-red-600/20 text-red-400 hover:from-red-500/30 hover:to-red-600/30 hover:text-red-300 border border-red-500/30 hover:border-red-500/50'
                            : 'bg-linear-to-r from-red-50 to-red-100 text-red-700 hover:from-red-100 hover:to-red-200 hover:text-red-800 border border-red-200 hover:border-red-300'
                        }
                    `}
                >
                    Salir
                </button>
            </div>
        </header>
    )
}
