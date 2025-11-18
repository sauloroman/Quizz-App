import React from 'react'
import { useForm } from 'react-hook-form'
import type { CreateQuiz } from '../../../interfaces/quizzly.interface'
import { SubmitButton } from '../../../shared/components/SubmitButton'
import { Input } from '../../../shared/components/Input'
import { Label } from '../../../shared/components/Label'
import { TextArea } from '../../../shared/components/TextArea'
import { FormErrorMessage } from '../../../shared/components/FormErrorMessage'
import { useQuiz } from '../../../shared/hooks'

export const CreateQuizzForm: React.FC = () => {

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset
    } = useForm<CreateQuiz>()

    const { createNewQuiz } = useQuiz()

    const onCreateNewQuizz = (data: CreateQuiz) => {
        createNewQuiz(data)
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onCreateNewQuizz)} className='space-y-4'>
            <div className='space-y-4'>
                <div className='flex-1'>
                    <Label text='Nombre' />
                    <Input
                        type='text'
                        placeholder='Conceptos Básicos de Javascript'
                        {
                        ...register('title', {
                            required: {
                                value: true,
                                message: 'El título es obligatorio'
                            }
                        })
                        }
                    />
                    { errors.title && <FormErrorMessage errorMessage={errors.title.message} /> }
                </div>
                <section className='flex items-center gap-4'>
                    <div className='flex-10'>
                        <Label text='Tema' />
                        <Input
                            type='text'
                            placeholder='Desarrollo web'
                            {
                            ...register('subject', {
                                required: {
                                    value: true,
                                    message: 'El tema es obligatorio'
                                }
                            })
                            }
                        />
                        { errors.subject && <FormErrorMessage errorMessage={errors.subject.message} /> }
                    </div>
                    <div className='flex-1'>
                        <Label text='Color' />
                        <Input
                            className='h-12'
                            type='color'
                            placeholder='Desarrollo web'
                            {...register('color')}
                        />
                        { errors.color && <FormErrorMessage errorMessage={errors.color.message} /> }
                    </div>
                </section>
                <div>
                    <Label text='Descripción' />
                    <TextArea
                        { ...register('description')}
                        placeholder='Este cuestionario evalúa conocimientos básicos de JavaScript, incluyendo variables, tipos de datos, funciones, arreglos y operadores.'
                    />
                </div>
            </div>
            <div className="w-full flex justify-end">
                <SubmitButton className='max-w-fit' submit text='Crear Quizz' />
            </div>
        </form>
    )
}
