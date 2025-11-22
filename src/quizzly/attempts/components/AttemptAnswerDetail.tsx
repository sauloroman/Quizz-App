import type { UserAnswer } from '../../../interfaces/quizzly.interface'

interface AnswerDetailProps {
  answer: UserAnswer
  index: number
  isDarkTheme: boolean
}

export const AttemptAnswerDetail: React.FC<AnswerDetailProps> = ({ answer, index, isDarkTheme }) => {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg ${isDarkTheme ? 'bg-slate-800' : 'bg-white'}`}>
      <div className="flex-1">
        <p className={`text-sm font-medium ${isDarkTheme ? 'text-white' : 'text-slate-900'}`}>Pregunta {index + 1}</p>
      </div>
      <div className="flex items-center gap-2">
        {answer.isCorrect ? (
          <>
            <i className="bx bx-check-circle text-green-500 text-xl"></i>
            <span className="text-sm font-semibold text-green-600 dark:text-green-400">+{answer.pointsEarned} pts</span>
          </>
        ) : (
          <>
            <i className="bx bx-x-circle text-red-500 text-xl"></i>
            <span className="text-sm font-semibold text-red-600 dark:text-red-400">0 pts</span>
          </>
        )}
      </div>
    </div>
  )
}