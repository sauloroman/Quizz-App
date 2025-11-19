import React from 'react'
import { useTheme } from '../../../shared/hooks'
import { SubmitButton } from '../../../shared/components/SubmitButton'
import { useQuestion } from '../../../shared/hooks/useQuestion'

interface Props {
  quizColor: string,
  questionsCounter: number
}

export const QuizzHeaderQuestionsCounter: React.FC<Props> = ({ quizColor, questionsCounter }) => {
  const { isDarkTheme } = useTheme()
  const { activateNewQuestionArea, creatingNewQuestion } = useQuestion()

  return (
    <header className={`rounded-lg border transition-colors p-6 mb-4 ${
      isDarkTheme
        ? 'bg-gray-800 border-gray-700'
        : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center justify-between gap-4">
        <div className='w-full'>
          <h2 className={`text-2xl font-bold mb-1 ${
            isDarkTheme ? 'text-white' : 'text-gray-900'
          }`}>
            Preguntas del cuestionario
          </h2>
          <p className={`text-sm ${
            isDarkTheme ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Total: <span 
              className="font-semibold"
              style={{ color: quizColor }}
            >
              {questionsCounter} {questionsCounter === 1 ? 'pregunta' : 'preguntas'}
            </span>
          </p>
        </div>
        <div className='w-64'>
          <SubmitButton 
            onClick={() => activateNewQuestionArea(!creatingNewQuestion)}
            style={{ backgroundColor: quizColor }}
            className="hover:opacity-90 transition-opacity"
            text={`${creatingNewQuestion ? 'Cancelar Creación' : '+ Crear pregunta'}`}
          />
        </div>
      </div>
    </header>
  )
}