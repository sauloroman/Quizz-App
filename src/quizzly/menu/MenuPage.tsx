import React from 'react'
import { useTheme } from '../../shared/hooks'
import { MainLayout } from '../../layout/MainLayout'
import { Menu } from './components/Menu'

export const MenuPage: React.FC = () => {

    const { isDarkTheme } = useTheme()

    return (
        <MainLayout title='Quizzly App'>
            <div className="grid grid-cols-2 items-center gap-5 py-10">
                <div className='flex items-start flex-col justify-center'>
                    <h1 className={`font-semibold text-7xl mb-8 space-x-3 ${isDarkTheme ? 'text-gray-200' : 'text-gray-800'}`}>Bienvenido a <br /> <span className={`font-black ${isDarkTheme ? 'text-gray-200' : 'text-orange-700'}`}>QuizzlyApp!</span></h1>
                    <p className={`${isDarkTheme ? 'text-gray-200' : 'text-gray-800'}`}>Elige un cuestionario o crea el tuyo propio</p>
                </div>
                <Menu />
            </div>
        </MainLayout>
    )
}
