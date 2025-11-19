import React from 'react'
import { useForm } from 'react-hook-form'
import { type EditQuiz } from '../../../interfaces/quizzly.interface'
import { useQuiz } from '../../../shared/hooks'
import { SubmitButton } from '../../../shared/components/SubmitButton'
import { Input } from '../../../shared/components/Input'
import { Label } from '../../../shared/components/Label'
import { TextArea } from '../../../shared/components/TextArea'
import { FormErrorMessage } from '../../../shared/components/FormErrorMessage'

export const EditQuizzForm: React.FC = () => {

    const { quizSelected, updateQuiz } = useQuiz()
    if (!quizSelected) return null;

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<EditQuiz>({
        defaultValues: {
            title: quizSelected.title,
            color: quizSelected.color,
            description: quizSelected.description,
            subject: quizSelected.subject,
        }
    })

    const onEditQuiz = (data: EditQuiz) => {
        updateQuiz(quizSelected.id, data)
    }

    return (
        <form onSubmit={handleSubmit(onEditQuiz)} className='space-y-4'>
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
                    {errors.title && <FormErrorMessage errorMessage={errors.title.message} />}
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
                        {errors.subject && <FormErrorMessage errorMessage={errors.subject.message} />}
                    </div>
                    
                    <div className='flex-1'>
                        <Label text='Color' />
                        <Input
                            className='h-12'
                            type='color'
                            {...register('color')}
                        />
                        {errors.color && <FormErrorMessage errorMessage={errors.color.message} />}
                    </div>
                </section>
                
                <div>
                    <Label text='Descripción' />
                    <TextArea
                        {...register('description')}
                        placeholder='Este cuestionario evalúa conocimientos básicos de JavaScript, incluyendo variables, tipos de datos, funciones, arreglos y operadores.'
                    />
                </div>
            </div>
            
            <div className="w-full flex justify-end gap-3 pt-4">
                <SubmitButton className='max-w-fit' submit text='Guardar Cambios' />
            </div>
        </form>
    )
}