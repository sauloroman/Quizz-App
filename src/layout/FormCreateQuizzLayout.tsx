import React from 'react'
import { useTheme } from '../shared/hooks'

interface Props {
    children: React.ReactNode,
    titleSection: string
}

export const FormCreateQuizzLayout: React.FC<Props> = ({children, titleSection}) => {
    const { isDarkTheme } = useTheme()

    return (
        <section className={`${isDarkTheme ? 'bg-[#2c3e50]' : 'bg-gray-200'} p-8 rounded-md`}>
            <h3 className='text-gray-100 font-bold uppercase text-lg mb-4'>{titleSection}</h3>
            { children }
        </section>
    )
}
