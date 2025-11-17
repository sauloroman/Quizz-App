export interface User {
  id: string
  name: string
  email: string
  password: string
  createdAt: Date
}

export interface Quiz {
  id: string
  userId: string
  title: string
  description?: string
  subject: 'HTML' | 'CSS' | 'JavaScript' | 'Accessibility'
  color?: string
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Question {
  id: string
  quizId: string
  questionText: string
  points: number
  order: number
  createdAt: Date
}

export interface Answer {
  id: string
  questionId: string
  answerText: string
  isCorrect: boolean
  order: number
}

export interface QuizAttempt {
  id: string
  quizId: string
  userId: string
  score: number
  totalPoints: number
  percentage: number
  completedAt: Date
  timeSpent?: number
}

export interface UserAnswer {
  id: string
  attemptId: string
  questionId: string
  answerId: string  
  isCorrect: boolean
  pointsEarned: number
}

export interface StudySession {
  id: string
  userId: string
  quizId: string
  startedAt: Date
  endedAt?: Date
  questionsReviewed: number
}