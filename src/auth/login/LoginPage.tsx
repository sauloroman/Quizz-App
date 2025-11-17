import React from 'react'
import { AuthLayout } from '../../layout/AuthLayout'
import { LoginForm } from './components/LoginForm'
import { Link } from 'react-router-dom'

export const LoginPage: React.FC = () => {
  return (
    <AuthLayout>
      <div className='relative h-screen w-full flex flex-col justify-center items-center lg:flex-none'>
        <div className='absolute lg:w-[80%] mx-auto -mt-10 lg:-mb-20'>
          <header className='flex flex-col gap-2 mb-8 text-gray-200'>
            <h1 className='text-2xl font-bold '>Bievenido de vuelta</h1>
            <p>Ingresa a Quizzly con tus credenciales y comienza a estudiar</p>
          </header>
          
          <LoginForm />

          <div className='mt-5 text-right'>
            <Link className='text-blue-400' to={'/auth/register'}>No tengo una cuenta</Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}
