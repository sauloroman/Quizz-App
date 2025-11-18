import React from 'react'
import type { Quiz } from '../../../interfaces/quizzly.interface'
import { QuizItem } from './QuizItem'

interface Props {
    quizzes: Quiz[]
    isDarkTheme: boolean
}

export const QuizzesList: React.FC<Props> = ({ quizzes, isDarkTheme }) => {
  return (
    <ul className='flex flex-col gap-4'>
        {
            quizzes.map( quiz => (
                <QuizItem
                    key={quiz.id}
                    {...quiz}
                    isDarkTheme={isDarkTheme}
                />
            ))
        }
    </ul>
  )
}