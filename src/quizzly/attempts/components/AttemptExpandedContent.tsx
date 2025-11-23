  import type { UserAnswer } from '../../../interfaces/quizzly.interface'
  import { SubmitButton } from '../../../shared/components/SubmitButton'
  import { useAttempts, useNavigate } from '../../../shared/hooks'
  import { useQuestion } from '../../../shared/hooks/useQuestion'
  import { AttemptAnswerDetail } from './AttemptAnswerDetail'

  interface ExpandedContentProps {
    attemptId: string
    userAnswers: UserAnswer[]
    isDarkTheme: boolean
  }

  export const AttemptExpandedContent: React.FC<ExpandedContentProps> = ({
    attemptId,
    userAnswers,
    isDarkTheme,
  }) => {

    const { getQuestionsFromQuiz } = useQuestion()
    const { goToPage } = useNavigate()
    const { getAttemptById } = useAttempts()

    const onSeeDetails = () => {
      const attempt = getAttemptById(attemptId)
      getQuestionsFromQuiz(attempt.result.quizId)
      goToPage(`attempt/summary/${attemptId}`)
    }

    return (
      <div className={`border-t px-6 py-5 ${isDarkTheme ? 'border-slate-700 bg-slate-700/50' : 'border-slate-200 bg-slate-50'}`}>
        <div className="mb-4">
          <h4 className={`text-sm font-semibold mb-3 ${isDarkTheme ? 'text-white' : 'text-slate-900'}`}>Detalles de respuestas</h4>
          <div className="space-y-2">
            {userAnswers.map((answer, idx) => (
              <AttemptAnswerDetail key={answer.id} answer={answer} index={idx} isDarkTheme={isDarkTheme} />
            ))}
          </div>
        </div>

        <SubmitButton onClick={onSeeDetails} submit text='Ver detalles' />
      </div>
    )
  }