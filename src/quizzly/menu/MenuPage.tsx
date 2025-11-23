import React from 'react'
import { useTheme } from '../../shared/hooks'
import { MainLayout } from '../../layout/MainLayout'
import { Menu } from './components/Menu'

export const MenuPage: React.FC = () => {
    const { isDarkTheme } = useTheme()

    return (
        <MainLayout title="Quizzly App">
            <div 
                className="
                    grid md:grid-cols-2 
                    items-center gap-5 py-10
                "
            >
                <div className="flex items-start flex-col justify-center">
                    <h1
                        className={`
                            text-center flex flex-col justify-center items-center
                            font-semibold text-6xl md:text-7xl mb-8
                            ${isDarkTheme ? 'text-gray-200' : 'text-gray-800'}
                        `}
                    >
                        Bienvenido a <br />
                        <span
                            className={`
                                font-black 
                                ${isDarkTheme ? 'text-gray-200' : 'text-orange-700'}
                            `}
                        >
                            QuizzlyApp!
                        </span>
                    </h1>

                    <p
                        className={`
                            text-lg
                            ${isDarkTheme ? 'text-gray-200' : 'text-gray-800'}
                        `}
                    >
                        Elige un cuestionario o crea el tuyo propio
                    </p>
                </div>

                <div className="flex justify-center">
                    <Menu />
                </div>
            </div>
        </MainLayout>
    )
}
