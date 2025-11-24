import React from 'react'
import { AuthLayout } from '../../layout/AuthLayout'
import { Link } from 'react-router-dom'
import { RegisterForm } from './components/RegisterForm'
import { useAuth, useTheme } from '../../shared/hooks'
import { Spinner } from '../../shared/components/Spinner'

export const RegisterPage: React.FC = () => {
  const { isLoading } = useAuth()
  const { isDarkTheme } = useTheme()

  return (
    <AuthLayout>
      <div className='relative h-screen w-full flex flex-col justify-center items-center lg:flex-none'>
        <div className='absolute lg:w-[80%] mx-auto -mt-10 lg:-mb-20'>
          <header className={`flex flex-col gap-2 mb-8 ${isDarkTheme ? 'text-slate-200' : 'text-gray-200'}`}>
            <h1 className={`text-3xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
              Registra una cuenta
            </h1>
            <p className={isDarkTheme ? 'text-slate-400' : 'text-gray-600'}>
              Comienza a crear tus quizzes y estudia en cualquier momento
            </p>
          </header>
          {
            isLoading
              ? (<div className='my-12 lg:h-80 flex justify-center items-center'><Spinner /></div>)
              : (
                <>
                  <RegisterForm />
                  <div className='mt-5 text-right'>
                    <Link 
                      className={`${isDarkTheme ? 'text-blue-400 hover:text-blue-300' : 'text-blue-500 hover:text-blue-600'} transition-colors`}
                      to={'/auth/login'}
                    >
                      Ya tengo una cuenta
                    </Link>
                  </div>
                </>
              )
          }
        </div>
      </div>
    </AuthLayout>
  )
}