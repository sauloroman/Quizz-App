import type { AttemptDBWithAnswers, Quiz } from '../../../interfaces/quizzly.interface'
import { useQuiz } from '../../../shared/hooks'
import { AttemptExpandedContent } from './AttemptExpandedContent'
import { AttemptInfo } from './AttemptInfo'
import { AttemptScoreCard } from './AttemptScoreCard'

interface CardProps {
  attempt: AttemptDBWithAnswers
  isExpanded: boolean
  isDarkTheme: boolean
  onToggle: () => void
  getScorePercentage: (score: number, total: number) => number
  getScoreColor: (percentage: number) => string
  getScoreBadgeColor: (percentage: number) => string
}

export const AttemptCard: React.FC<CardProps> = ({
  attempt,
  isExpanded,
  isDarkTheme,
  onToggle,
  getScorePercentage,
  getScoreColor,
  getScoreBadgeColor,
}) => {

  const { quizes } = useQuiz()
  const quiz = quizes.find( (quiz: Quiz) => quiz.id === attempt.result.quizId )

  const percentage = getScorePercentage(attempt.result.score, attempt.result.totalPoints)
  const correctAnswers = attempt.userAnswers.filter(a => a.isCorrect).length
  const totalQuestions = attempt.userAnswers.length

  return (
    <div className={`rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden ${isDarkTheme ? 'bg-slate-800' : 'bg-white'}`}>
      <button
        onClick={onToggle}
        className={`w-full px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 transition-colors duration-200 ${isDarkTheme
          ? 'hover:bg-slate-700'
          : 'hover:bg-slate-50'
        }`}
      >
        <div className="flex flex-col md:flex-row items-center gap-3 sm:gap-6 flex-1 w-full sm:w-auto">
          <div className="shrink-0">
            <AttemptScoreCard
              percentage={percentage}
              score={attempt.result.score}
              totalPoints={attempt.result.totalPoints}
              getScoreColor={getScoreColor}
            />
          </div>

          <div className="flex-1 min-w-0">
            <AttemptInfo
              quiz={quiz!}
              percentage={percentage}
              completedAt={attempt.result.completedAt}
              correctAnswers={correctAnswers}
              totalQuestions={totalQuestions}
              isDarkTheme={isDarkTheme}
              getScoreBadgeColor={getScoreBadgeColor}
            />
          </div>
        </div>
      </button>

      {isExpanded && (
        <AttemptExpandedContent
          attemptId={attempt.result.id}
          userAnswers={attempt.userAnswers}
          isDarkTheme={isDarkTheme}
        />
      )}
    </div>
  )
}