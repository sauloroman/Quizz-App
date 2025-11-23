import React from 'react'
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import type { UserProgressData } from '../../../interfaces/quizzly.interface'

interface ProgressChartProps {
    progressData: UserProgressData
    isDarkTheme: boolean
}

export const ProgressChart: React.FC<ProgressChartProps> = ({ progressData, isDarkTheme }) => {
    const cardBg = isDarkTheme ? 'bg-slate-800' : 'bg-white'
    const cardBorder = isDarkTheme ? 'border-slate-700' : 'border-slate-200'
    const textPrimary = isDarkTheme ? 'text-white' : 'text-slate-900'

    if (!progressData.attemptsByDate || progressData.attemptsByDate.length === 0) {
        return null
    }

    return (
        <div className={`${cardBg} border ${cardBorder} rounded-lg p-6 shadow-sm`}>
            <div className="flex items-center gap-2 mb-4">
                <i className={`bx bx-line-chart text-2xl ${isDarkTheme ? 'text-blue-400' : 'text-blue-500'}`}></i>
                <h3 className={`text-lg font-semibold ${textPrimary}`}>Progreso a lo Largo del Tiempo</h3>
            </div>
            <ResponsiveContainer width="100%" height={350}>
                <LineChart data={progressData.attemptsByDate}>
                    <CartesianGrid 
                        strokeDasharray="3 3" 
                        stroke={isDarkTheme ? '#334155' : '#e2e8f0'}
                    />
                    <XAxis 
                        dataKey="date"
                        stroke={isDarkTheme ? '#94a3b8' : '#64748b'}
                        tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                        stroke={isDarkTheme ? '#94a3b8' : '#64748b'}
                        label={{ value: 'Score (%)', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip 
                        contentStyle={{
                            backgroundColor: isDarkTheme ? '#1e293b' : '#ffffff',
                            border: `1px solid ${isDarkTheme ? '#334155' : '#e2e8f0'}`,
                            borderRadius: '0.5rem',
                            color: isDarkTheme ? '#f1f5f9' : '#1e293b',
                        }}
                    />
                    <Legend />
                    <Line 
                        type="monotone" 
                        dataKey="attempts" 
                        stroke="#3b82f6" 
                        dot={false}
                        strokeWidth={2}
                        name="Intentos"
                    />
                    <Line 
                        type="monotone" 
                        dataKey="averageScore" 
                        stroke="#10b981" 
                        dot={false}
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Promedio"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}