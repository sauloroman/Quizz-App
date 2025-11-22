import type { UserAnswer } from '../../../interfaces/quizzly.interface'
import { SubmitButton } from '../../../shared/components/SubmitButton'
import { useNavigate } from '../../../shared/hooks'
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

  const { goToPage } = useNavigate()

  const onSeeDetails = () => {
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