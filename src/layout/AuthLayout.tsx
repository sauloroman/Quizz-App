import React from 'react'
import { useTheme } from '../shared/hooks'
import { Slides } from '../shared/components/Slides'
import logoDark from '../assets/img/logo-dark-mode.png'
import logoLight from '../assets/img/logo-light-mode.png'

interface Props {
    children: React.ReactNode
}

export const AuthLayout: React.FC<Props> = ({ children }) => {
    const { isDarkTheme } = useTheme()
    
    return (
        <div className={`
            min-h-screen
            grid grid-cols-1 lg:grid-cols-6
            content-center
            transition-colors duration-200
            ${isDarkTheme 
                ? 'bg-gray-900' 
                : 'bg-white'
            }
        `}>
            <div className='lg:col-span-3 relative p-8 overflow-hidden h-screen'>
                <div className={`
                    absolute left-0 top-0 rounded-full w-96 h-96 
                    translate-x-[-50%] translate-y-[-50%] z-0
                    transition-colors duration-200
                    ${isDarkTheme 
                        ? 'bg-gray-700' 
                        : 'bg-blue-100'
                    }
                `}></div>
                <div className={`
                    absolute right-0 bottom-0 rounded-full w-96 h-96 
                    translate-x-[50%] translate-y-[50%] z-0
                    transition-colors duration-200
                    ${isDarkTheme 
                        ? 'bg-gray-700' 
                        : 'bg-purple-300'
                    }
                `}></div>
                <div className='absolute top-5 right-10'>
                    <img
                        className='w-24' 
                        src={isDarkTheme ? logoDark : logoLight} 
                        alt='Logo Quizzly' 
                    />
                </div>
                <div className="relative z-10 flex flex-col justify-center items-center lg:h-[90vh]">
                    {children}
                </div>
            </div>
            <div className={`
                lg:col-span-3
                hidden lg:flex h-screen items-center justify-center
                ${isDarkTheme 
                    ? 'bg-[#3d4f5c]' 
                    : 'bg-gray-100'
                }
            `}>
                <Slides />
            </div>
        </div>
    )
}