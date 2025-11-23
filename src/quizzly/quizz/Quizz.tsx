import React, { useEffect, useMemo } from 'react'
import { MainLayout } from '../../layout/MainLayout'
import { useAuth, useModal, useQuiz } from '../../shared/hooks'
import { useQuestion } from '../../shared/hooks/useQuestion'

import { QuizzCover } from './components/QuizzCover'
import { QuizzInfo } from './components/QuizzInfo'
import { QuizzListQuestions } from './components/QuizzListQuestions'
import { QuizzHeaderQuestionsCounter } from './components/QuizzHeaderQuestionsCounter'
import { QuizzEmptyQuestions } from './components/QuizzEmptyQuestions'
import { QuizzActions } from './components/QuizzActions'
import { Spinner } from '../../shared/components/Spinner'

import { ModalNames } from '../../interfaces/ui.interface'
import { QuizModalInitAttempt } from './components/QuizModalInitAttempt'
import { QuestionModalEditQuestion } from './components/QuestionModalEditQuestion'
import { QuizConfirmDelete } from './components/QuizConfirmDelete'
import { QuestionConfirmDelete } from './components/QuestionConfirmDelete'

export const Quizz: React.FC = () => {

  const { quizSelected } = useQuiz()
  const { questions, getQuestionsFromQuiz, isLoading } = useQuestion()
  const { user } = useAuth()
  const { modal } = useModal()

  if (!quizSelected || !user) return null

  const quizColor = quizSelected.color ?? '#000000'

  useEffect(() => {
    getQuestionsFromQuiz(quizSelected.id)
  }, [quizSelected.id])

  const totalQuestions = useMemo(() => questions.length, [questions])

  return (
    <MainLayout title={quizSelected.title}>
      <div className="w-[95%] mx-auto -mt-10">
        <QuizzCover
          quizId={quizSelected.id}
          quizImage={quizSelected.image}
          quizzTitle={quizSelected.title}
          quizzColor={quizColor}
        />

        <main className="grid grid-cols-1 lg:grid-cols-7 gap-4 my-5">
          <div className="lg:col-span-2">
            <QuizzInfo
              user={user}
              color={quizColor}
              subject={quizSelected.subject}
              description={quizSelected.description ?? 'Quiz sin descripción'}
              createdAt={quizSelected.createdAt}
              updatedAt={quizSelected.updatedAt}
            />

            <QuizzActions
              quizId={quizSelected.id}
              quizColor={quizColor}
            />
          </div>

          <div className="lg:col-span-5">
            <QuizzHeaderQuestionsCounter
              quizColor={quizColor}
              questionsCounter={totalQuestions}
            />

            {isLoading ? (
              <div className="my-12 lg:h-80 flex justify-center items-center">
                <Spinner />
              </div>
            ) : (
              totalQuestions === 0
                ? <QuizzEmptyQuestions />
                : <QuizzListQuestions questions={questions} />
            )}
          </div>
        </main>
      </div>

      {modal.isOpen && modal.name === ModalNames.confirmDeleteQuizz && <QuizConfirmDelete />}
      {modal.isOpen && modal.name === ModalNames.confirmInitAttempt && <QuizModalInitAttempt />}
      {modal.isOpen && modal.name === ModalNames.editQuestion && <QuestionModalEditQuestion />}
      {modal.isOpen && modal.name === ModalNames.deleteQuestion && <QuestionConfirmDelete />}
    </MainLayout>
  )
}
