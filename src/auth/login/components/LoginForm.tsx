import React from 'react'
import { useForm } from 'react-hook-form'
import { Label } from '../../../shared/components/Label'
import { Input } from '../../../shared/components/Input'
import { FormErrorMessage } from '../../../shared/components/FormErrorMessage'
import { SubmitButton } from '../../../shared/components/SubmitButton'
import { useAuth } from '../../../shared/hooks'
import { OutlineButton } from '../../../shared/components/OutlineButton'

interface LoginFormI {
    email: string,
    password: string
}

export const LoginForm: React.FC = () => {
    
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors }
    } = useForm<LoginFormI>()
    const { loginUser, loginUserWithGoogle } = useAuth()
    
    const onLoginUser = ( data: LoginFormI ) => {
        loginUser( data )
        reset()
    }   

    const onLoginGoogle = () => {
        loginUserWithGoogle()
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onLoginUser)} className='flex flex-col gap-3'>
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
                    })}
                />
                { errors.email && <FormErrorMessage errorMessage={errors.email.message} />}
            </div>
            <div>
                <Label text='Contraseña' />
                <Input 
                    type='password'
                    placeholder='Ingrese su contraseña'
                    {
                        ...register('password', {
                            required: {
                                value: true,
                                message: 'La contraseña es obligatoria'
                            },
                        })
                    }
                />
                { errors.password && <FormErrorMessage errorMessage={errors.password.message} />}
            </div>
            <div className="flex items-center gap-3 mt-5">
                <div className="flex-1">
                    <SubmitButton submit text='Iniciar Sesión'/>
                </div>
                <div className='flex-1'>
                    <OutlineButton onClick={onLoginGoogle} text='Iniciar con Google' />
                </div>
            </div>
        </form>
    )
}
