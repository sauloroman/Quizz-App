import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import {
    startCalculatingAllStats, 
    startCalculatingOverallStats, 
    startCalculatingProgressData, 
    startCalculatingQuizStats 
} from "../../store/stats/stats.thunk"

export const useStats = () => {

    const dispatch = useDispatch<any>()
    const { isLoading, overallStats, progressData, quizStats } = useSelector((state: RootState) => state.stats)

    const calculateAllStats = () => {
        dispatch(startCalculatingAllStats())
    }

    const calculateOverallStats = () => {
        dispatch(startCalculatingOverallStats())
    }

    const calculateQuizStats = () => {
        dispatch(startCalculatingQuizStats())
    }

    const calculateProgressData = () => {
        dispatch(startCalculatingProgressData())
    }

    return {
        isLoading,
        overallStats,
        progressData,
        quizStats,

        calculateAllStats,
        calculateOverallStats,
        calculateQuizStats,
        calculateProgressData,
    }
}