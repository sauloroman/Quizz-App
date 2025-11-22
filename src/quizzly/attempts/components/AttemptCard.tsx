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
    <div
      className={`rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden ${isDarkTheme
        ? 'bg-slate-800'
        : 'bg-white'
      }`}
    >

      <div
        className="h-2 w-full"
        style={{ backgroundColor: quiz?.color || '#6B7280' }}
      />

      <button
        onClick={onToggle}
        className={`w-full px-6 py-5 flex items-center justify-between transition-colors duration-200 ${isDarkTheme
          ? 'hover:bg-slate-700'
          : 'hover:bg-slate-50'
        }`}
      >
        <div className="flex items-center gap-6 flex-1">
          <AttemptScoreCard
            percentage={percentage}
            score={attempt.result.score}
            totalPoints={attempt.result.totalPoints}
            getScoreColor={getScoreColor}
          />

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

        <i className={`bx bx-chevron-down text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}></i>
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
