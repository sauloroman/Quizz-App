import React from 'react'
import { AuthLayout } from '../../layout/AuthLayout'
import { LoginForm } from './components/LoginForm'
import { Link } from 'react-router-dom'
import { useAuth } from '../../shared/hooks'
import { Spinner } from '../../shared/components/Spinner'

export const LoginPage: React.FC = () => {
  const { isLoading } = useAuth()

  return (
    <AuthLayout>
      <div className='relative h-screen w-full flex flex-col justify-center items-center lg:flex-none'>
        <div className='absolute lg:w-[80%] mx-auto -mt-10 lg:-mb-20'>
          <header className='flex flex-col gap-2 mb-8 text-gray-200'>
            <h1 className='text-3xl font-bold '>Bievenido de vuelta</h1>
            <p>Ingresa a Quizzly con tus credenciales y comienza a estudiar</p>
          </header>
          {
            isLoading
              ? (<div className='my-12 lg:h-80 flex justify-center items-center'><Spinner /></div>)
              : (
                <>
                  <LoginForm />
                  <div className='mt-5 text-right'>
                    <Link className='text-blue-400' to={'/auth/register'}>No tengo una cuenta</Link>
                  </div>
                </>
              )
          }
        </div>
      </div>
    </AuthLayout>
  )
}
