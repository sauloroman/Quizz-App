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
  if (!quizSelected) return null

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
    <form onSubmit={handleSubmit(onEditQuiz)} className="space-y-6">
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
          placeholder="Este cuestionario evalúa conocimientos básicos de JavaScript..."
        />
      </div>

      <div className="w-full flex justify-end">
        <SubmitButton className="max-w-fit" submit text="Guardar Cambios" />
      </div>

    </form>
  )
}
