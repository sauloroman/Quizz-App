import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Label } from '../../../shared/components/Label'
import { Input } from '../../../shared/components/Input'
import { FormErrorMessage } from '../../../shared/components/FormErrorMessage'
import { SubmitButton } from '../../../shared/components/SubmitButton'
import { useAuth, useTheme } from '../../../shared/hooks'
import type { RegisterUserWithEmail } from '../../../interfaces/auth.interface'

export const RegisterForm: React.FC = () => {
    
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors }
    } = useForm<RegisterUserWithEmail>()

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const { registerUser } = useAuth()
    const { isDarkTheme } = useTheme()
    
    const onRegisterUser = (data: RegisterUserWithEmail) => {
        registerUser( data )
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onRegisterUser)} className='flex flex-col gap-3'>
            <div>
                <Label text='Nombre Completo' />
                <Input 
                    type='text'
                    placeholder='Ingrese su nombre completo'
                    {...register('name', {
                        required: {
                            value: true,
                            message: 'El nombre es obligatorio'
                        },
                        minLength: {
                            value: 3,
                            message: 'El nombre debe tener al menos 3 caracteres'
                        }
                    })}
                />
                {errors.name && <FormErrorMessage errorMessage={errors.name.message} />}
            </div>

            <div>
                <Label text='Correo Electrónico' />
                <Input 
                    type='email'
                    placeholder='Ingrese su correo electrónico'
                    {...register('email', {
                        required: {
                            value: true,
                            message: 'El correo es obligatorio'
                        },
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Correo electrónico inválido'
                        }
                    })}
                />
                {errors.email && <FormErrorMessage errorMessage={errors.email.message} />}
            </div>

            <div>
                <Label text='Contraseña' />
                <div className='flex items-center gap-2'>
                    <Input 
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Ingrese su contraseña'
                        {...register('password', {
                            required: {
                                value: true,
                                message: 'La contraseña es obligatoria'
                            },
                            minLength: {
                                value: 6,
                                message: 'La contraseña debe tener al menos 6 caracteres'
                            }
                        })}
                    />
                    <i 
                        onClick={() => setShowPassword(!showPassword)} 
                        className={`bxr bx-${showPassword ? 'eye-slash' : 'eye'} text-2xl ${isDarkTheme ? ' text-white placeholder-gray-400 focus:ring-blue-400' : 'bg-gray-100 text-gray-900 placeholder-gray-500 focus:ring-blue-500'}`}
                    ></i>
                </div>
                {errors.password && <FormErrorMessage errorMessage={errors.password.message} />}
            </div>
            
            <div className="mt-5">
                <SubmitButton text='Crear Cuenta' type='submit' />
            </div>
        </form>
    )
}