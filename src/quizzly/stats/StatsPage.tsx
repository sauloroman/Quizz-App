import React, { useEffect } from 'react'
import { MainLayout } from '../../layout/MainLayout'
import { useStats, useTheme } from '../../shared/hooks'
import {
    OverallStatsCards,
    ProgressChart,
    QuizStatsTable,
    StatsEmptyState,
    StreaksCards
} from './components'
import { Spinner } from '../../shared/components/Spinner'

export const StatsPage: React.FC = () => {
    const { isDarkTheme } = useTheme()
    const {
        calculateAllStats,
        isLoading,
        overallStats,
        progressData,
        quizStats
    } = useStats()

    useEffect(() => {
        calculateAllStats()
    }, [])

    if (isLoading) {
        return (
            <MainLayout title='Tus estadísticas'>
                <div className='h-screen flex flex-col items-center justify-center py-20 gap-4'>
                    <Spinner />
                    <p className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
                        Cargando...
                    </p>
                </div>
            </MainLayout>
        )
    }

    return (
        <MainLayout title='Tus estadísticas'>
            <div className="space-y-6 pb-6">

                {overallStats ? (
                    <>

                        {/* ⭐ Mantengo exactamente tu diseño desktop */}
                        <div className="w-full">
                            <OverallStatsCards
                                overallStats={overallStats}
                                isDarkTheme={isDarkTheme}
                            />
                        </div>

                        {/* ⭐ Gráfico — responsivo en móvil, igual en desktop */}
                        <div className="w-full overflow-x-auto sm:overflow-visible">
                            {progressData && (
                                <ProgressChart
                                    progressData={progressData}
                                    isDarkTheme={isDarkTheme}
                                />
                            )}
                        </div>

                        {/* ⭐ Rachas — mantenemos estilo original */}
                        <div className="w-full">
                            {progressData && (
                                <StreaksCards
                                    progressData={progressData}
                                    isDarkTheme={isDarkTheme}
                                />
                            )}
                        </div>

                        {/* ⭐ Tabla — scroll solo en móvil */}
                        <div className="w-full overflow-x-auto sm:overflow-visible">
                            {quizStats && (
                                <QuizStatsTable
                                    quizStats={quizStats}
                                    isDarkTheme={isDarkTheme}
                                />
                            )}
                        </div>
                    </>
                ) : (
                    <StatsEmptyState isDarkTheme={isDarkTheme} />
                )}
            </div>
        </MainLayout>
    )
}
