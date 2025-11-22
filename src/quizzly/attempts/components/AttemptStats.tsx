interface StatsProps {
  correctAnswers: number
  totalQuestions: number
  percentage: number
  isDarkTheme: boolean
}

export const AttemptStats: React.FC<StatsProps> = ({ correctAnswers, totalQuestions, percentage, isDarkTheme }) => {
  return (
    <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200 dark:border-slate-600">
      <div className={`p-3 rounded-lg ${isDarkTheme ? 'bg-slate-800' : 'bg-white'}`}>
        <p className={`text-xs mb-1 ${isDarkTheme ? 'text-slate-400' : 'text-slate-600'}`}>Correctas</p>
        <p className="text-2xl font-bold text-green-600 dark:text-green-400">{correctAnswers}</p>
      </div>
      <div className={`p-3 rounded-lg ${isDarkTheme ? 'bg-slate-800' : 'bg-white'}`}>
        <p className={`text-xs mb-1 ${isDarkTheme ? 'text-slate-400' : 'text-slate-600'}`}>Incorrectas</p>
        <p className="text-2xl font-bold text-red-600 dark:text-red-400">{totalQuestions - correctAnswers}</p>
      </div>
      <div className={`p-3 rounded-lg ${isDarkTheme ? 'bg-slate-800' : 'bg-white'}`}>
        <p className={`text-xs mb-1 ${isDarkTheme ? 'text-slate-400' : 'text-slate-600'}`}>Precisión</p>
        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{percentage}%</p>
      </div>
    </div>
  )
}