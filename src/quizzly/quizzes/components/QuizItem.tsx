import React from 'react'
import { formatDate } from '../../../shared/helpers/format-date'
import { useNavigate, useQuiz, useTheme } from '../../../shared/hooks'

interface Props {
  id: string
  title: string
  description: string
  subject: string
  color: string
  createdAt: Date
}

export const QuizItem: React.FC<Props> = ({
  id,
  title,
  description,
  subject,
  color,
  createdAt,
}) => {

  const { isDarkTheme } = useTheme()
  const { goToPage } = useNavigate()
  const { activateQuiz } = useQuiz()

  const onSelectQuiz = () => {
    activateQuiz(id)
    goToPage(`quizz/${id}`)
  }

  const containerClasses = `
    rounded-lg border overflow-hidden flex flex-col h-full 
    cursor-pointer transition-all hover:shadow-lg
    ${isDarkTheme
      ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
      : 'bg-white border-gray-200 hover:border-gray-300'
    }
  `

  const titleClasses = `
    text-lg font-semibold truncate
    ${isDarkTheme ? 'text-gray-100' : 'text-gray-900'}
  `

  const descriptionClasses = `
    text-sm line-clamp-2 mb-4
    ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}
  `

  const subjectClasses = `
    inline-flex items-center w-fit px-3 py-1 rounded-full text-xs font-medium
    ${isDarkTheme ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}
  `

  return (
    <li onClick={onSelectQuiz} className={containerClasses}>
      <div
        className="h-2 w-full"
        style={{ backgroundColor: color || '#6B7280' }}
      />

      <div className="p-4 flex flex-col flex-1 gap-4">

        <h3 className={titleClasses}>{title}</h3>

        {description && (
          <p className={descriptionClasses}>
            {description}
          </p>
        )}

        <div className="flex flex-col gap-2 mt-auto">
          <span className={subjectClasses}>
            {subject}
          </span>

          <span className="text-xs text-gray-500">
            {formatDate(createdAt)}
          </span>
        </div>
      </div>

    </li>
  )
}
