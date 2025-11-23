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
            question: { questionText: '', points: 1 },
            answers: Array(4).fill({ answerText: '', isCorrect: false })
        }
    })

    const { fields } = useFieldArray({ control, name: 'answers' })

    const onCreateNewQuestion = (data: CreateQuestionWithAnswers) => {
        const correctIndex = Number(data.correctAnswer)

        const finalData = {
            ...data,
            answers: data.answers.map((ans, idx) => ({
                ...ans,
                isCorrect: idx === correctIndex
            }))
        }

        createQuestionInQuiz(finalData)
        reset()
    }

    const answersContainerClasses = `
        rounded-lg border p-4 transition-colors
        ${isDarkTheme ? 'bg-gray-800/40 border-gray-700' : 'bg-gray-50 border-gray-200'}
    `

    const answerItemClasses = `
        flex flex-col md:flex-row items-center gap-3 p-3 rounded-lg border transition-colors
        ${isDarkTheme
            ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
            : 'bg-white border-gray-200 hover:border-gray-300'}
    `

    const answerLabelClasses = `
        w-20 shrink-0 text-sm font-medium 
        ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}
    `

    return (
        <form className="space-y-6" onSubmit={handleSubmit(onCreateNewQuestion)}>

            <section className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
                <div className="flex-1 w-full">
                    <Label text="Pregunta" />
                    <Input
                        {...register('question.questionText', {
                            required: 'El texto de la pregunta es obligatorio'
                        })}
                        placeholder="¿Cuál es el significado de...?"
                    />
                    {errors.question?.questionText && (
                        <FormErrorMessage errorMessage={errors.question.questionText.message} />
                    )}
                </div>

                <div className="w-full sm:w-32">
                    <Label text="Puntos" />
                    <Select
                        {...register('question.points', {
                            required: 'Obligatorio',
                            valueAsNumber: true
                        })}
                        placeholder="Cantidad"
                        options={['1', '2', '5', '10']}
                    />
                    {errors.question?.points && (
                        <FormErrorMessage errorMessage={errors.question.points.message} />
                    )}
                </div>
            </section>

            <section className={answersContainerClasses}>
                <p className={`mb-4 text-sm font-semibold ${isDarkTheme ? 'text-gray-100' : 'text-gray-800'}`}>
                    Selecciona una opción como la respuesta correcta
                </p>

                <div className="space-y-3">
                    {fields.map((field, index) => (
                        <div key={field.id} className={answerItemClasses}>

                            <div className="shrink-0">
                                <InputRadio
                                    {...register('correctAnswer', { required: true })}
                                    value={index}
                                />
                            </div>

                            <label className={answerLabelClasses}>
                                Opción {index + 1}
                            </label>

                            <div className="flex-1">
                                <Input
                                    {...register(`answers.${index}.answerText`, {
                                        required: 'La respuesta es obligatoria'
                                    })}
                                    placeholder="Escribe la opción"
                                />
                                {errors.answers?.[index]?.answerText && (
                                    <FormErrorMessage
                                        errorMessage={errors.answers[index]?.answerText?.message}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {errors.correctAnswer && (
                    <FormErrorMessage errorMessage="Debes seleccionar una respuesta correcta" />
                )}
            </section>

            <div className="flex justify-end pt-4">
                <SubmitButton submit text="Guardar Pregunta" className="w-fit" />
            </div>

        </form>
    )
}
