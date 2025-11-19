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
  subject: string
  color?: string
  createdAt: Date
  updatedAt: Date
  image: string
}

export interface CreateQuiz {
  title: string
  subject: string
  description?: string
  color?: string,
  image?: string
}

export interface EditQuiz {
  title?: string,
  subject?: string,
  description?: string,
  color?: string,
  image?: string
}

export interface Question {
  id: string
  quizId: string
  questionText: string
  points: number
  createdAt: Date
}

export interface CreateQuestion {
  questionText: string,
  points: number,
  order: number
}

export interface Answer {
  id: string
  questionId: string
  answerText: string
  isCorrect: boolean
}

export interface CreateAnswer {
  answerText: string,
  isCorrect: boolean,
}

export interface CreateQuestionWithAnswers {
  question: CreateQuestion,
  answers: CreateAnswer[]
  correctAnswer: string,
}

export interface QuestionWithAnswers {
  question: Question,
  answers: Answer[]
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