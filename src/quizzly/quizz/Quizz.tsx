import React, { useEffect } from 'react'
import { QuizzCover } from './components/QuizzCover'
import { useAuth, useModal, useQuiz } from '../../shared/hooks'
import { MainLayout } from '../../layout/MainLayout'
import { QuizzInfo } from './components/QuizzInfo'
import { QuizzListQuestions } from './components/QuizzListQuestions'
import { QuizzHeaderQuestionsCounter } from './components/QuizzHeaderQuestionsCounter'
import { useQuestion } from '../../shared/hooks/useQuestion'
import { QuizzEmptyQuestions } from './components/QuizzEmptyQuestions'
import { QuizzActions } from './components/QuizzActions'
import { Spinner } from '../../shared/components/Spinner'
import { ModalNames } from '../../interfaces/ui.interface'
import { QuizConfirmDelete } from './components/QuizConfirmDelete'

export const Quizz: React.FC = () => {

  const { quizSelected } = useQuiz()
  const { questions, getQuestionsFromQuiz, isLoading } = useQuestion()
  const { user } = useAuth()
  const { modal: { isOpen: modalIsOpen, name: modalName } } = useModal()
  
  if (!quizSelected || !user ) return null

  useEffect(() => {
    getQuestionsFromQuiz(quizSelected.id)
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
            <QuizzActions 
              quizId={quizSelected.id}
              quizColor={quizSelected.color ?? '#000000'}
            />
          </div>
          <div className="col-span-5">
            <QuizzHeaderQuestionsCounter quizColor={quizSelected.color ?? '#000000'} questionsCounter={questions.length}/>
            {
              questions.length === 0
              ? (<QuizzEmptyQuestions />)
              : (
                isLoading
                ? (<div className='my-12 lg:h-80 flex justify-center items-center'><Spinner /></div>)
                : (<QuizzListQuestions questions={questions} />)
              )
            }
          </div>
        </main>
      </div>
      { modalIsOpen && modalName === ModalNames.confirmDeleteQuizz && <QuizConfirmDelete />}
    </MainLayout>
  )
}