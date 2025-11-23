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
    <form onSubmit={handleSubmit(onCreateNewQuizz)} className="space-y-6">
      <div>
        <Label text="Nombre" />
        <Input
          type="text"
          placeholder="Conceptos Básicos de JavaScript"
          {...register('title', {
            required: {
              value: true,
              message: 'El título es obligatorio'
            }
          })}
        />
        {errors.title && <FormErrorMessage errorMessage={errors.title.message} />}
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-6 gap-6">
        <div className="sm:col-span-5">
          <Label text="Tema" />
          <Input
            type="text"
            placeholder="Desarrollo web"
            {...register('subject', {
              required: {
                value: true,
                message: 'El tema es obligatorio'
              }
            })}
          />
          {errors.subject && <FormErrorMessage errorMessage={errors.subject.message} />}
        </div>
        <div className="flex flex-col">
          <Label text="Color" />
          <Input
            className="h-12 cursor-pointer"
            type="color"
            {...register('color')}
          />
          {errors.color && <FormErrorMessage errorMessage={errors.color.message} />}
        </div>
      </section>

      <div>
        <Label text="Descripción" />
        <TextArea
          {...register('description')}
          placeholder="Este cuestionario evalúa conocimientos básicos de JavaScript, incluyendo variables, tipos de datos, funciones, arreglos y operadores."
        />
      </div>

      <div className="w-full flex justify-end">
        <SubmitButton className="max-w-fit" submit text="Crear Quizz" />
      </div>
    </form>
  )
}
