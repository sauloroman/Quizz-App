import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Quizz } from '../quizzly/quizz/Quizz'
import { Quizzes } from '../quizzly/quizzes/Quizzes'
import { Study } from '../quizzly/study-quizz/Study'
import { MenuPage } from '../quizzly/menu/MenuPage'
import { CreateQuizzPage } from '../quizzly/create-quizz/CreateQuizzPage'
import { AttemptsPage } from '../quizzly/attempts/AttemptsPage'
import { useQuiz } from '../shared/hooks'
import { EditQuizzPage } from '../quizzly/edit-quizz/EditQuizzPage'
import { Attempt } from '../quizzly/attempt/Attempt'
import { AttemptSummaryPage } from '../quizzly/attempt-summary/AttemptSummaryPage'
import { StatsPage } from '../quizzly/stats/StatsPage'

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
      <Route path='/edit-quizz/:id' element={<EditQuizzPage />} />
      <Route path='/attempts' element={<AttemptsPage />} />
      <Route path='quizz/:id' element={<Quizz />} />
      <Route path='attempt/:id' element={<Attempt />} />
      <Route path='attempt/summary/:id' element={<AttemptSummaryPage />} />
      <Route path='study/:id' element={<Study />} />
      <Route path='stats' element={<StatsPage />} />
      <Route path='/*' element={<Navigate to={'/'} />} />
    </Routes>
  )
}
