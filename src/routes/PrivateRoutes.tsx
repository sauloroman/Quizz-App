import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Quizz } from '../quizzly/quizz/Quizz'
import { Quizzes } from '../quizzly/quizzes/Quizzes'
import { Study } from '../quizzly/study-quizz/Study'
import { MenuPage } from '../quizzly/menu/MenuPage'
import { CreateQuizzPage } from '../quizzly/create-quizz/CreateQuizzPage'
import { AttemptsPage } from '../quizzly/attempts/AttemptsPage'
import { useQuiz } from '../shared/hooks'

export const PrivateRoutes: React.FC = () => {
  const { getQuizzes, quizes } = useQuiz()

  useEffect(() => {
    if ( quizes.length === 0 ){
      getQuizzes()
    }
  }, [])

  return (
    <Routes>
      <Route path='/' element={<MenuPage />} />
      <Route path='/quizzes' element={<Quizzes />} />
      <Route path='/create-quizz' element={<CreateQuizzPage />} />
      <Route path='/attempts' element={<AttemptsPage />} />
      <Route path='quizz/:id' element={<Quizz />} />
      <Route path='study/:id' element={<Study />} />
      <Route path='/*' element={<Navigate to={'/'} />} />
    </Routes>
  )
}
