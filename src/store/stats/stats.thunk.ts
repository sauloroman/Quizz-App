import type { Dispatch } from "@reduxjs/toolkit"
import type { RootState } from "../store"
import {
    setIsLoading,
    setOverallStats,
    setQuizStats,
    setProgressData,
    setError,
} from "./stats.slice"
import type { OverallStats, QuizStats, UserProgressData, AttemptDBWithAnswers } from "../../interfaces/quizzly.interface"
import { FirebaseDB } from "../../config/firebase/config"
import { collection, getDocs } from "firebase/firestore/lite"

const getUserAttempts = async (userId: string): Promise<AttemptDBWithAnswers[]> => {
    const attemptsRef = collection(FirebaseDB, "attempts")
    const attemptsSnapshot = await getDocs(attemptsRef)

    const attempts: AttemptDBWithAnswers[] = []

    for (const attemptDoc of attemptsSnapshot.docs) {
        const attemptData = attemptDoc.data()
        
        if (attemptData.userId !== userId) {
            continue
        }

        const userAnswersRef = collection(FirebaseDB, `attempts/${attemptDoc.id}/userAnswers`)
        const userAnswersSnapshot = await getDocs(userAnswersRef)
        
        const userAnswers = userAnswersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as any[]

        attempts.push({
            result: {
                id: attemptDoc.id,
                quizId: attemptData.quizId,
                userId: attemptData.userId,
                score: attemptData.score,
                totalPoints: attemptData.totalPoints,
                completedAt: attemptData.completedAt?.toDate?.() || new Date(),
            },
            userAnswers
        })
    }

    return attempts
}

export const startCalculatingAllStats = () => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        dispatch(setIsLoading(true))
        try {
            const { auth: { user } } = getState()
            if (!user) {
                dispatch(setError("Usuario no autenticado"))
                return
            }

            const userId = user.id

            const attempts = await getUserAttempts(userId)

            if (attempts.length === 0) {
                dispatch(setOverallStats(null))
                dispatch(setQuizStats([]))
                dispatch(setProgressData(null))
                return
            }

            const { quizzes: { quizes: allQuizzes } } = getState()
            const totalQuizzesAvailable = allQuizzes?.length || 0

            const totalQuizzesTaken = new Set(attempts.map(a => a.result.quizId)).size
            const totalQuestionsAnswered = attempts.reduce((sum, a) => sum + a.userAnswers.length, 0)
            const totalCorrectAnswers = attempts.reduce(
                (sum, a) => sum + a.userAnswers.filter(ua => ua.isCorrect).length,
                0
            )
            const totalIncorrectAnswers = totalQuestionsAnswered - totalCorrectAnswers
            const overallCorrectPercentage = totalQuestionsAnswered > 0
                ? Math.round((totalCorrectAnswers / totalQuestionsAnswered) * 100)
                : 0
            const overallAverageScore = attempts.length > 0
                ? Math.round(attempts.reduce((sum, a) => sum + a.result.score, 0) / attempts.length)
                : 0
            const bestQuizScore = attempts.length > 0
                ? Math.max(...attempts.map(a => a.result.score))
                : 0
            const worstQuizScore = attempts.length > 0
                ? Math.min(...attempts.map(a => a.result.score))
                : 0
            const totalPointsEarned = attempts.reduce((sum, a) => sum + a.result.score, 0)
            const totalPointsAvailable = attempts.reduce((sum, a) => sum + a.result.totalPoints, 0)

            const overallStats: OverallStats = {
                totalQuizzesTaken,
                totalQuizzesAvailable,
                totalQuestionsAnswered,
                totalCorrectAnswers,
                totalIncorrectAnswers,
                overallCorrectPercentage,
                overallAverageScore,
                bestQuizScore,
                worstQuizScore,
                totalPointsEarned,
                totalPointsAvailable,
            }

            dispatch(setOverallStats(overallStats))

            const attemptsByQuiz: { [key: string]: AttemptDBWithAnswers[] } = {}
            attempts.forEach(attempt => {
                const quizId = attempt.result.quizId
                if (!attemptsByQuiz[quizId]) {
                    attemptsByQuiz[quizId] = []
                }
                attemptsByQuiz[quizId].push(attempt)
            })

            const quizStats: QuizStats[] = Object.entries(attemptsByQuiz).map(([quizId, quizAttempts]) => {
                const totalAttempts = quizAttempts.length
                const scores = quizAttempts.map(a => a.result.score)
                const averageScore = Math.round(scores.reduce((a, b) => a + b, 0) / totalAttempts)
                const bestScore = Math.max(...scores)
                const worstScore = Math.min(...scores)

                const allUserAnswers = quizAttempts.flatMap(a => a.userAnswers)
                const totalCorrectAnswers = allUserAnswers.filter(ua => ua.isCorrect).length
                const totalIncorrectAnswers = allUserAnswers.length - totalCorrectAnswers
                const correctAnswerPercentage = allUserAnswers.length > 0
                    ? Math.round((totalCorrectAnswers / allUserAnswers.length) * 100)
                    : 0

                return {
                    quizId,
                    totalAttempts,
                    averageScore,
                    bestScore,
                    worstScore,
                    totalCorrectAnswers,
                    totalIncorrectAnswers,
                    correctAnswerPercentage,
                }
            })

            dispatch(setQuizStats(quizStats))

            const attemptsByDate: { [key: string]: AttemptDBWithAnswers[] } = {}

            attempts.forEach(attempt => {
                const dateStr = new Date(attempt.result.completedAt).toISOString().split('T')[0]
                if (!attemptsByDate[dateStr]) {
                    attemptsByDate[dateStr] = []
                }
                attemptsByDate[dateStr].push(attempt)
            })

            const attemptsByDateArray = Object.entries(attemptsByDate)
                .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
                .map(([date, dayAttempts]) => {
                    const scores = dayAttempts.map(a => a.result.score)
                    const averageScore = Math.round(scores.reduce((a, b) => a + b, 0) / dayAttempts.length)

                    return {
                        date,
                        attempts: dayAttempts.length,
                        averageScore,
                    }
                })

            const today = new Date()
            let currentStreak = 0
            let longestStreak = 0
            let tempStreak = 0
            let lastDate: Date | null = null

            attemptsByDateArray.forEach(({ date }) => {
                const currentDate = new Date(date)
                const daysDiff = lastDate ? Math.floor((lastDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)) : 0

                if (lastDate === null || daysDiff === 1) {
                    tempStreak++
                } else if (daysDiff === 0) {
                    // Mismo día, no contar
                } else {
                    if (tempStreak > longestStreak) {
                        longestStreak = tempStreak
                    }
                    tempStreak = 1
                }

                lastDate = currentDate
            })

            if (tempStreak > longestStreak) {
                longestStreak = tempStreak
            }

            if (attemptsByDateArray.length > 0) {
                const lastAttemptDate = new Date(attemptsByDateArray[attemptsByDateArray.length - 1].date)
                const daysSinceLastAttempt = Math.floor((today.getTime() - lastAttemptDate.getTime()) / (1000 * 60 * 60 * 24))

                if (daysSinceLastAttempt === 0) {
                    currentStreak = 1
                    for (let i = attemptsByDateArray.length - 2; i >= 0; i--) {
                        const currentAttemptDate = new Date(attemptsByDateArray[i].date)
                        const prevAttemptDate = new Date(attemptsByDateArray[i + 1].date)
                        const diff = Math.floor((prevAttemptDate.getTime() - currentAttemptDate.getTime()) / (1000 * 60 * 60 * 24))

                        if (diff === 1) {
                            currentStreak++
                        } else {
                            break
                        }
                    }
                } else if (daysSinceLastAttempt === 1) {
                    currentStreak = 1
                }
            }

            const progressData: UserProgressData = {
                attemptsByDate: attemptsByDateArray,
                longestStreak,
                currentStreak,
            }

            dispatch(setProgressData(progressData))

        } catch (error) {
            console.error(error)
            dispatch(setError("Error al calcular todas las estadísticas"))
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}

export const startCalculatingOverallStats = () => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        dispatch(setIsLoading(true))
        try {
            const { auth: { user } } = getState()
            if (!user) {
                dispatch(setError("Usuario no autenticado"))
                return
            }

            const userId = user.id

            const attempts = await getUserAttempts(userId)

            if (!attempts || attempts.length === 0) {
                dispatch(setOverallStats(null))
                return
            }

            const { quizzes: { quizes: allQuizzes } } = getState()
            const totalQuizzesAvailable = allQuizzes?.length || 0

            const totalQuizzesTaken = new Set(attempts.map(a => a.result.quizId)).size
            const totalQuestionsAnswered = attempts.reduce((sum, a) => sum + a.userAnswers.length, 0)
            const totalCorrectAnswers = attempts.reduce(
                (sum, a) => sum + a.userAnswers.filter(ua => ua.isCorrect).length,
                0
            )
            const totalIncorrectAnswers = totalQuestionsAnswered - totalCorrectAnswers
            const overallCorrectPercentage = totalQuestionsAnswered > 0
                ? Math.round((totalCorrectAnswers / totalQuestionsAnswered) * 100)
                : 0
            const overallAverageScore = attempts.length > 0
                ? Math.round(attempts.reduce((sum, a) => sum + a.result.score, 0) / attempts.length)
                : 0
            const bestQuizScore = attempts.length > 0
                ? Math.max(...attempts.map(a => a.result.score))
                : 0
            const worstQuizScore = attempts.length > 0
                ? Math.min(...attempts.map(a => a.result.score))
                : 0
            const totalPointsEarned = attempts.reduce((sum, a) => sum + a.result.score, 0)
            const totalPointsAvailable = attempts.reduce((sum, a) => sum + a.result.totalPoints, 0)

            const overallStats: OverallStats = {
                totalQuizzesTaken,
                totalQuizzesAvailable,
                totalQuestionsAnswered,
                totalCorrectAnswers,
                totalIncorrectAnswers,
                overallCorrectPercentage,
                overallAverageScore,
                bestQuizScore,
                worstQuizScore,
                totalPointsEarned,
                totalPointsAvailable,
            }

            dispatch(setOverallStats(overallStats))
        } catch (error) {
            console.error(error)
            dispatch(setError("Error al calcular estadísticas generales"))
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}

export const startCalculatingQuizStats = () => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        dispatch(setIsLoading(true))
        try {
            const { auth: { user } } = getState()
            if (!user) {
                dispatch(setError("Usuario no autenticado"))
                return
            }

            const userId = user.id

            const attempts = await getUserAttempts(userId)

            if (!attempts || attempts.length === 0) {
                dispatch(setQuizStats([]))
                return
            }

            const attemptsByQuiz: { [key: string]: AttemptDBWithAnswers[] } = {}
            attempts.forEach(attempt => {
                const quizId = attempt.result.quizId
                if (!attemptsByQuiz[quizId]) {
                    attemptsByQuiz[quizId] = []
                }
                attemptsByQuiz[quizId].push(attempt)
            })

            const quizStats: QuizStats[] = Object.entries(attemptsByQuiz).map(([quizId, quizAttempts]) => {
                const totalAttempts = quizAttempts.length
                const scores = quizAttempts.map(a => a.result.score)
                const averageScore = Math.round(scores.reduce((a, b) => a + b, 0) / totalAttempts)
                const bestScore = Math.max(...scores)
                const worstScore = Math.min(...scores)

                const allUserAnswers = quizAttempts.flatMap(a => a.userAnswers)
                const totalCorrectAnswers = allUserAnswers.filter(ua => ua.isCorrect).length
                const totalIncorrectAnswers = allUserAnswers.length - totalCorrectAnswers
                const correctAnswerPercentage = allUserAnswers.length > 0
                    ? Math.round((totalCorrectAnswers / allUserAnswers.length) * 100)
                    : 0

                return {
                    quizId,
                    totalAttempts,
                    averageScore,
                    bestScore,
                    worstScore,
                    totalCorrectAnswers,
                    totalIncorrectAnswers,
                    correctAnswerPercentage,
                }
            })
            dispatch(setQuizStats(quizStats))
        } catch (error) {
            console.error(error)
            dispatch(setError("Error al calcular estadísticas por quiz"))
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}

export const startCalculatingProgressData = () => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        dispatch(setIsLoading(true))
        try {
            const { auth: { user } } = getState()
            if (!user) {
                dispatch(setError("Usuario no autenticado"))
                return
            }

            const userId = user.id

            const attempts = await getUserAttempts(userId)

            if (!attempts || attempts.length === 0) {
                dispatch(setProgressData(null))
                return
            }

            const attemptsByDate: { [key: string]: AttemptDBWithAnswers[] } = {}

            attempts.forEach(attempt => {
                const dateStr = new Date(attempt.result.completedAt).toISOString().split('T')[0]
                if (!attemptsByDate[dateStr]) {
                    attemptsByDate[dateStr] = []
                }
                attemptsByDate[dateStr].push(attempt)
            })

            const attemptsByDateArray = Object.entries(attemptsByDate)
                .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
                .map(([date, dayAttempts]) => {
                    const scores = dayAttempts.map(a => a.result.score)
                    const averageScore = Math.round(scores.reduce((a, b) => a + b, 0) / dayAttempts.length)

                    return {
                        date,
                        attempts: dayAttempts.length,
                        averageScore,
                    }
                })

            const today = new Date()
            let currentStreak = 0
            let longestStreak = 0
            let tempStreak = 0
            let lastDate: Date | null = null

            attemptsByDateArray.forEach(({ date }) => {
                const currentDate = new Date(date)
                const daysDiff = lastDate ? Math.floor((lastDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)) : 0

                if (lastDate === null || daysDiff === 1) {
                    tempStreak++
                } else if (daysDiff === 0) {
                    // Mismo día, no contar
                } else {
                    if (tempStreak > longestStreak) {
                        longestStreak = tempStreak
                    }
                    tempStreak = 1
                }

                lastDate = currentDate
            })

            if (tempStreak > longestStreak) {
                longestStreak = tempStreak
            }

            if (attemptsByDateArray.length > 0) {
                const lastAttemptDate = new Date(attemptsByDateArray[attemptsByDateArray.length - 1].date)
                const daysSinceLastAttempt = Math.floor((today.getTime() - lastAttemptDate.getTime()) / (1000 * 60 * 60 * 24))

                if (daysSinceLastAttempt === 0) {
                    currentStreak = 1
                    for (let i = attemptsByDateArray.length - 2; i >= 0; i--) {
                        const currentAttemptDate = new Date(attemptsByDateArray[i].date)
                        const prevAttemptDate = new Date(attemptsByDateArray[i + 1].date)
                        const diff = Math.floor((prevAttemptDate.getTime() - currentAttemptDate.getTime()) / (1000 * 60 * 60 * 24))

                        if (diff === 1) {
                            currentStreak++
                        } else {
                            break
                        }
                    }
                } else if (daysSinceLastAttempt === 1) {
                    currentStreak = 1
                }
            }

            const progressData: UserProgressData = {
                attemptsByDate: attemptsByDateArray,
                longestStreak,
                currentStreak,
            }

            dispatch(setProgressData(progressData))
        } catch (error) {
            console.error(error)
            dispatch(setError("Error al calcular datos de progreso"))
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}