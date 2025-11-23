import React, { useEffect, useState } from 'react'
import { useAttempts, useTheme } from '../../shared/hooks'
import { EmptyAttemptsState } from './components/EmptyAttemptsState'
import { MainLayout } from '../../layout/MainLayout'
import { AttemptsHeader } from './components/AttemptsHeader'
import { AttemptCard } from './components/AttemptCard'
import type { AttemptDBWithAnswers } from '../../interfaces/quizzly.interface'
import { Spinner } from '../../shared/components/Spinner'

export const AttemptsPage: React.FC = () => {
  const { isDarkTheme } = useTheme()
  const { attempts, getAttemptsOfUser, isLoading } = useAttempts()
  const [expandedAttempt, setExpandedAttempt] = useState<string | null>(null)

  useEffect(() => { getAttemptsOfUser() }, [])

  const getScorePercentage = (score: number, total: number) => {
    return Math.round((score / total) * 100)
  }

  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return 'from-green-500 to-emerald-600'
    if (percentage >= 75) return 'from-blue-500 to-cyan-600'
    if (percentage >= 60) return 'from-amber-500 to-orange-600'
    return 'from-red-500 to-rose-600'
  }

  const getScoreBadgeColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    if (percentage >= 75) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    if (percentage >= 60) return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  }

  if (attempts.length === 0) {
    return <EmptyAttemptsState isDarkTheme={isDarkTheme} />
  }

  return (
    <MainLayout title='Tus intentos de resolver un quizz'>
      {isLoading ? (
        <div className='h-screen flex flex-col items-center justify-center py-20 gap-4'>
          <Spinner />
          <p className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
            Cargando...
          </p>
        </div>
      ) : (
        <>

          <div className="px-2 sm:px-0">
            <AttemptsHeader
              isDarkTheme={isDarkTheme}
              totalAttempts={attempts.length}
            />
          </div>

          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            gap-4 sm:gap-5
            px-2 sm:px-0
            pb-6
          ">
            {attempts.map((attempt: AttemptDBWithAnswers) => (
              <AttemptCard
                key={attempt.result.id}
                attempt={attempt}
                isExpanded={expandedAttempt === attempt.result.id}
                isDarkTheme={isDarkTheme}
                onToggle={() =>
                  setExpandedAttempt(
                    expandedAttempt === attempt.result.id
                      ? null
                      : attempt.result.id
                  )
                }
                getScorePercentage={getScorePercentage}
                getScoreColor={getScoreColor}
                getScoreBadgeColor={getScoreBadgeColor}
              />
            ))}
          </div>

        </>
      )}
    </MainLayout>
  )
}
