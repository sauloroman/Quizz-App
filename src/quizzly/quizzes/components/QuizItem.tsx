import React from 'react'
import type { Quiz } from '../../../interfaces/quizzly.interface'
import { formatDate } from '../../../shared/helpers/format-date'
import { useModal } from '../../../shared/hooks'
import { ModalNames } from '../../../interfaces/ui.interface'
import { IconButton } from '../../../shared/components/IconButton'

interface Props extends Quiz {
    isDarkTheme: boolean
}

export const QuizItem: React.FC<Props> = ({ 
  id, 
  title, 
  description, 
  subject, 
  color, 
  createdAt,
  isDarkTheme 
}) => {

  const { onOpenModal } = useModal()

  const onSelectQuizz = () => {
    onOpenModal(ModalNames.confirmDeleteQuizz)
  }

  const onEditQuizz = () => {

  }

  const onDeleteQuizz = () => {

  }

  return (
    <li
      onClick={onSelectQuizz}
      className={`rounded-lg border transition-all hover:shadow-lg cursor-pointer ${
        isDarkTheme
          ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
          : 'bg-white border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div
            className="w-1 h-16 rounded-full shrink-0"
            style={{ backgroundColor: color || '#6B7280' }}
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className={`text-lg font-semibold mb-1 ${
                  isDarkTheme ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  {title}
                </h3>
                
                {description && (
                  <p className={`text-sm mb-2 ${
                    isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {description}
                  </p>
                )}
                
                <div className="flex flex-wrap items-center gap-3 mt-3">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      isDarkTheme ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {subject}
                  </span>
                  
                  <span className={`text-xs ${
                    isDarkTheme ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    Creado: {formatDate(createdAt)}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-3">                
                <IconButton><i className='bxr bx-trash text-xl'></i> </IconButton>
                <IconButton><i className='bxr bx-pen text-xl'></i> </IconButton>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}