import React from 'react'
import { MainLayout } from '../../layout/MainLayout'
import { CreateQuizzForm } from './components/CreateQuizzForm'
import { useTheme } from '../../shared/hooks'
import { useQuiz } from '../../shared/hooks/useQuiz'
import { Spinner } from '../../shared/components/Spinner'

export const CreateQuizzPage: React.FC = () => {  
  const { isDarkTheme } = useTheme()
  const { isLoading } = useQuiz()
  
  return (
    <MainLayout title='Crear Nuevo Quizz'>
      <div className='space-y-10 w-[80%] mx-auto'>
        
        <section className={`${isDarkTheme ? 'bg-[#2c3e50]' : 'bg-gray-200'} p-8 rounded-md`}>
          <h3 className='text-gray-100 font-bold uppercase text-lg mb-4'>Información General</h3>
          {
            isLoading
            ? (<div className='my-12 lg:h-80 flex justify-center items-center'><Spinner /></div>)
            : (<CreateQuizzForm />)
          }
        </section>
      
      </div>
    </MainLayout>
  )
}
