interface ScoreCardProps {
  percentage: number
  score: number
  totalPoints: number
  getScoreColor: (percentage: number) => string
}

export const AttemptScoreCard: React.FC<ScoreCardProps> = ({ percentage, score, totalPoints, getScoreColor }) => {
  return (
    <div className={`w-20 h-20 rounded-lg bg-linear-to-br ${getScoreColor(percentage)} flex items-center justify-center shadow-lg`}>
      <div className="text-center">
        <div className="text-xl font-bold text-white">{percentage}%</div>
        <div className="text-xs text-white opacity-90 font-medium">{score}/{totalPoints}</div>
      </div>
    </div>
  )
}