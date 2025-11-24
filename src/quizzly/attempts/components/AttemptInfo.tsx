import type { Quiz } from "../../../interfaces/quizzly.interface"

interface InfoProps {
  quiz: Quiz
  percentage: number
  completedAt: Date
  correctAnswers: number
  totalQuestions: number
  isDarkTheme: boolean
  getScoreBadgeColor: (percentage: number) => string
}

export const AttemptInfo: React.FC<InfoProps> = ({
  quiz,
  percentage,
  correctAnswers,
  totalQuestions,
  isDarkTheme,
  getScoreBadgeColor,
}) => {
    
  return (
    <div className="flex-1 text-left relative">
      <div className="flex flex-col-reverse md:flew-row md:items-start items-center gap-3 mb-2">
        <h3 className={`text-lg font-semibold ${isDarkTheme ? 'text-white' : 'text-slate-900'}`}>Quiz &mdash; {quiz?.title ?? ''}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getScoreBadgeColor(percentage)}`}>
          {percentage >= 90 ? 'Excelente' : percentage >= 75 ? 'Bien' : percentage >= 60 ? 'Regular' : 'Necesita mejora'}
        </span>
      </div>
      <div className={`flex flex-col items-center gap-4 text-sm ${isDarkTheme ? 'text-slate-400' : 'text-slate-600'}`}>
        <div className="flex items-center gap-2">
          <span>{correctAnswers} de {totalQuestions} correctas</span>
        </div>
      </div>
    </div>
  )
}