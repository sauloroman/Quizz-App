import React from 'react'
import { QuizzCover } from './components/QuizzCover'
import { useAuth, useQuiz } from '../../shared/hooks'
import { MainLayout } from '../../layout/MainLayout'
import { QuizzInfo } from './components/QuizzInfo'
import { QuizzListQuestions } from './components/QuizzListQuestions'
import { QuizzHeaderQuestionsCounter } from './components/QuizzHeaderQuestionsCounter'

export const Quizz: React.FC = () => {
  const { quizSelected } = useQuiz()
  const { user } = useAuth()
  
  if (!quizSelected || !user ) return null

  return (
    <MainLayout title={quizSelected.title}>
      <div className='w-[90%] mx-auto -mt-10'>
        <QuizzCover 
          quizImage={quizSelected.image}
          quizId={quizSelected.id}
          quizzTitle={quizSelected.title}
          quizzColor={quizSelected.color ?? '#000000'}
        />

        <main className='grid grid-cols-7 gap-3 my-5'>
          <div className='col-span-2'>
            <QuizzInfo 
              user={ user }
              color={quizSelected.color ?? '#000000'}
              description={quizSelected.description ?? 'Quiz sin descripción'}
              subject={quizSelected.subject}
              createdAt={quizSelected.createdAt}
              updatedAt={quizSelected.updatedAt}
            />
          </div>
          <div className="col-span-5">
            <QuizzHeaderQuestionsCounter />
            <QuizzListQuestions />
          </div>
        </main>
      </div>
    </MainLayout>
  )
}