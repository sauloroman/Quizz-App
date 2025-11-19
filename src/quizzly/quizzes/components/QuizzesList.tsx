import React from 'react'
import type { Quiz } from '../../../interfaces/quizzly.interface'
import { QuizItem } from './QuizItem'

interface Props {
    quizzes: Quiz[]
}

export const QuizzesList: React.FC<Props> = ({ quizzes }) => {
    return (
        <ul className='grid grid-cols-4 gap-3'>
            {
                quizzes.map( quiz => (
                    <QuizItem
                        key={quiz.id}
                        id={quiz.id}
                        title={quiz.title}
                        description={quiz.description ?? ''}
                        color={quiz.color ?? ''}
                        subject={quiz.subject}
                        createdAt={quiz.createdAt}
                    />
                ))
            }
        </ul>
    )
}