import React from 'react'
import { Label } from '../../../shared/components/Label'
import { Input } from '../../../shared/components/Input'
import { Select } from '../../../shared/components/Select'
import { InputRadio } from '../../../shared/components/InputRadio'
import { useTheme } from '../../../shared/hooks'
import { SubmitButton } from '../../../shared/components/SubmitButton'
import { useFieldArray, useForm } from 'react-hook-form'
import { type CreateQuestionWithAnswers } from '../../../interfaces/quizzly.interface'
import { FormErrorMessage } from '../../../shared/components/FormErrorMessage'
import { useQuestion } from '../../../shared/hooks/useQuestion'

export const QuizzCreateQuestionForm: React.FC = () => {
    const { createQuestionInQuiz } = useQuestion()
    const { isDarkTheme } = useTheme()

    const {
        handleSubmit,
        register,
        reset,
        control,
        formState: { errors }
    } = useForm<CreateQuestionWithAnswers>({
        defaultValues: {
            correctAnswer: '',
            question: {
                questionText: '',
                points: 1
            },
            answers: [
                { answerText: '', isCorrect: false },
                { answerText: '', isCorrect: false },
                { answerText: '', isCorrect: false },
                { answerText: '', isCorrect: false },
            ]
        }
    })

    const { fields } = useFieldArray({ control, name: 'answers' })

    const onCreateNewQuestion = (data: CreateQuestionWithAnswers) => {
        const correctIndex = Number(data.correctAnswer)

        const updatedAnswers = data.answers.map((ans, idx) => ({
            ...ans,
            isCorrect: idx === correctIndex
        }))

        const finalData = {
            ...data,
            answers: updatedAnswers
        }

        createQuestionInQuiz(finalData)
        reset()
    }

    return (
        <form className='space-y-6' onSubmit={handleSubmit(onCreateNewQuestion)}>

            <section className='flex flex-col sm:flex-row items-start sm:items-end gap-4'>
                <div className='flex-1'>
                    <Label text='Pregunta' />
                    <Input 
                        {...register('question.questionText', {
                            required: 'El texto de la pregunta es obligatorio'
                        })}
                        type='text'
                        placeholder='¿Cuál es el significado de...?'
                    />
                    { errors.question?.questionText && (
                        <FormErrorMessage errorMessage={errors.question.questionText.message}/>
                    )}
                </div>

                <div className='w-full sm:w-32'>
                    <Label text='Puntos' />
                    <Select
                        {...register('question.points', {
                            required: 'Obligatorio',
                            valueAsNumber: true
                        })}
                        placeholder='Cantidad' 
                        options={['1', '2', '5', '10']}
                    />
                    { errors.question?.points && (
                        <FormErrorMessage errorMessage={errors.question.points.message}/>
                    )}
                </div>
            </section>

            <section className={`rounded-lg border transition-colors p-4 ${isDarkTheme ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                <p className={`mb-4 text-sm font-semibold ${
                    isDarkTheme ? 'text-gray-100' : 'text-gray-800'
                }`}>
                    Selecciona una opción como la respuesta correcta
                </p>

                <div className='space-y-3'>
                    {fields.map((field, answerIndex) => (
                        <div 
                            key={field.id}
                            className={`flex items-center gap-3 p-3 rounded-lg transition-colors border ${
                                isDarkTheme
                                    ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
                                    : 'bg-white border-gray-200 hover:border-gray-300'
                            }`}
                        >
                            <div className='shrink-0'>
                                <InputRadio
                                    {...register("correctAnswer", { required: true })}
                                    type='radio'
                                    value={answerIndex}
                                />
                            </div>

                            <label className={`w-16 shrink-0 text-sm font-medium ${
                                isDarkTheme ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                                Opción {answerIndex + 1}
                            </label>
                            
                            <div className="flex-1">
                                <Input 
                                    {...register(`answers.${answerIndex}.answerText`, {
                                        required: 'La respuesta es obligatoria'
                                    })}
                                    placeholder='Escribe la opción'
                                    className='flex-1'
                                />
                                { errors.answers?.[answerIndex]?.answerText && (
                                    <FormErrorMessage errorMessage={errors.answers[answerIndex]?.answerText?.message}/>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {errors.correctAnswer && (
                    <FormErrorMessage errorMessage='Debes seleccionar una respuesta correcta'/>
                )}
            </section>

            <div className='flex gap-3 justify-end pt-4'>
                <div className="w-48">
                    <SubmitButton 
                        className='w-fit'
                        submit
                        text='Guardar Pregunta'
                    />
                </div>
            </div>
        </form>
    )
}