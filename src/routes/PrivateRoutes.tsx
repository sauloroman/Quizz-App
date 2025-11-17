import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Quizz } from '../quizzly/quizz/Quizz'
import { Quizzes } from '../quizzly/quizzes/Quizzes'
import { Study } from '../quizzly/study-quizz/Study'

export const PrivateRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Quizzes />} />
      <Route path='quizz/:id' element={<Quizz />} />
      <Route path='study/:id' element={<Study />} />
      <Route path='/*' element={<Navigate to={'/'} />} />
    </Routes>
  )
}
