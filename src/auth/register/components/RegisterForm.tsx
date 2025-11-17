import React from 'react'
import { useForm } from 'react-hook-form'
import { Label } from '../../../shared/components/Label'
import { Input } from '../../../shared/components/Input'
import { FormErrorMessage } from '../../../shared/components/FormErrorMessage'
import { SubmitButton } from '../../../shared/components/SubmitButton'

interface RegisterFormI {
    name: string
    email: string
    password: string
}

export const RegisterForm: React.FC = () => {
    
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors }
    } = useForm<RegisterFormI>()
    
    const onRegisterUser = (data: RegisterFormI) => {
        console.log(data)
        // Aquí irá la lógica de registro
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
                <Input 
                    type='password'
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
                {errors.password && <FormErrorMessage errorMessage={errors.password.message} />}
            </div>

            <SubmitButton className='mt-5' text='Crear Cuenta' type='submit' />
        </form>
    )
}