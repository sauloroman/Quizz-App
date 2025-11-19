import React from 'react'
import { formatDate } from '../../../shared/helpers/format-date'
import { useNavigate, useQuiz, useTheme } from '../../../shared/hooks'
import { IconButton } from '../../../shared/components/IconButton'

interface Props {
  id: string,
  title: string,
  description: string,
  subject: string,
  color: string,
  createdAt: Date,
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

  return (
    <li
      onClick={onSelectQuiz}
      className={`rounded-lg border transition-all hover:shadow-lg cursor-pointer overflow-hidden flex flex-col h-full ${
        isDarkTheme
          ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
          : 'bg-white border-gray-200 hover:border-gray-300'
      }`}
    >
      <div
        className="h-1 w-full"
        style={{ backgroundColor: color || '#6B7280' }}
      />
      
      <div className="p-4 flex flex-col flex-1">
        
        <div className="mb-3">
          <h3 className={`text-lg font-semibold truncate ${
            isDarkTheme ? 'text-gray-100' : 'text-gray-900'
          }`}>
            {title}
          </h3>
        </div>
        
        {description && (
          <p className={`text-sm mb-4 line-clamp-2 ${
            isDarkTheme ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {description}
          </p>
        )}
        
        <div className="flex flex-col gap-2 flex-1">
          <span
            className={`inline-flex items-center w-fit px-3 py-1 rounded-full text-xs font-medium ${
              isDarkTheme ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
            }`}
          >
            {subject}
          </span>
          
          <span className={`text-xs ${
            isDarkTheme ? 'text-gray-500' : 'text-gray-500'
          }`}>
            {formatDate(createdAt)}
          </span>
        </div>  
      </div>
      
      <div className="flex justify-end p-4 pb-2">
          <IconButton onClick={onSelectQuiz}>
            <i className='bxr bx-eye'></i> 
          </IconButton>
          <IconButton onClick={onSelectQuiz}>
            <i className='bxr bx-book'></i> 
          </IconButton>
      </div>
      
    </li>
  )
}