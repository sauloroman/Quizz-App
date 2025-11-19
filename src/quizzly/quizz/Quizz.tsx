import React, { useEffect } from 'react'
import { QuizzCover } from './components/QuizzCover'
import { useAuth, useQuiz } from '../../shared/hooks'
import { MainLayout } from '../../layout/MainLayout'
import { QuizzInfo } from './components/QuizzInfo'
import { QuizzListQuestions } from './components/QuizzListQuestions'
import { QuizzHeaderQuestionsCounter } from './components/QuizzHeaderQuestionsCounter'
import { useQuestion } from '../../shared/hooks/useQuestion'
import { QuizzEmptyQuestions } from './components/QuizzEmptyQuestions'

export const Quizz: React.FC = () => {

  const { quizSelected } = useQuiz()
  const { questions, getQuestionsFromQuiz } = useQuestion()
  const { user } = useAuth()
  
  if (!quizSelected || !user ) return null

  useEffect(() => {
    if ( questions.length === 0 ) {
      getQuestionsFromQuiz(quizSelected.id)
    }
  }, [quizSelected.id])

  return (
    <MainLayout title={quizSelected.title}>
      <div className='w-[90%] mx-auto -mt-10'>
        <QuizzCover 
          quizImage={quizSelected.image}
          quizId={quizSelected.id}
          quizzTitle={quizSelected.title}
          quizzColor={quizSelected.color ?? '#000000'}
        />

        <main className='grid grid-cols-7 gap-4 my-5'>
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
            <QuizzHeaderQuestionsCounter quizColor={quizSelected.color ?? '#000000'} questionsCounter={questions.length}/>
            {
              questions.length === 0
              ? (<QuizzEmptyQuestions />)
              : (<QuizzListQuestions />)
            }
          </div>
        </main>
      </div>
    </MainLayout>
  )
}