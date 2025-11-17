import React from 'react'
import { AuthLayout } from '../../layout/AuthLayout'
import { Link } from 'react-router-dom'
import { RegisterForm } from './components/RegisterForm'

export const RegisterPage: React.FC = () => {
  return (
    <AuthLayout>
      <div className='relative h-screen w-full flex flex-col justify-center items-center lg:flex-none'>
        <div className='absolute lg:w-[80%] mx-auto -mt-10 lg:-mb-20'>
          <header className='flex flex-col gap-2 mb-8 text-gray-200'>
            <h1 className='text-2xl font-bold '>Registra una cuenta</h1>
            <p>Comienza a crear tus quizzes y estudia en cualquier momento</p>
          </header>

          <RegisterForm />

          <div className='mt-5 text-right'>
            <Link className='text-blue-400' to={'/auth/login'}>Ya tengo una cuenta</Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}
