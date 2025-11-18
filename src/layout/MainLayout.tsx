import React from 'react'
import { useTheme } from '../shared/hooks'
import { Header } from '../shared/components/Header'

interface Props {
    children: React.ReactNode,
    title: string,
}

export const MainLayout: React.FC<Props> = ({ title, children }) => {
    const { isDarkTheme } = useTheme()

    return (
        <div className={`
            min-h-screen
            transition-colors duration-200
            ${isDarkTheme 
                ? 'bg-[#3d4f5c]'
                : 'bg-gray-50'
            }
        `}>
           <Header title={title} />
            <main className='lg:w-[85%] w-[95%] mx-auto py-10'>
                {children}
            </main>
        </div>
    )
}