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
  points: number
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

export interface EditQuestionWithAnswers {
  question?: Question,
  answers?: Answer[]
  correctAnswer?: string,
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
  completedAt: Date
}

export interface CreateQuizAttempt {
  quizId: string,
  userId: string,
  score: number,
  totalPoints: number,
  completedAt: Date,
}

export interface UserAnswer {
  id: string
  attemptId: string
  questionId: string
  answerId: string  
  isCorrect: boolean
  pointsEarned: number
}

export interface CreateUserAnswer {
  questionId: string
  answerId: string  
  isCorrect: boolean
  pointsEarned: number
}

export interface AttemptWithAnswers {
  result: CreateQuizAttempt | null,
  userAnswers: CreateUserAnswer[]
}

export interface AttemptDBWithAnswers {
  result: QuizAttempt,
  userAnswers: UserAnswer[]
}

export interface StudySession {
  id: string
  userId: string
  quizId: string
  startedAt: Date
  endedAt?: Date
  questionsReviewed: number
}

export interface QuestionWithUserAnswer {
  question: QuestionWithAnswers
  userAnswer: UserAnswer
  selectedAnswer: Answer | undefined
}

export interface QuizStats {
    quizId: string
    totalAttempts: number
    averageScore: number
    bestScore: number
    worstScore: number
    totalCorrectAnswers: number
    totalIncorrectAnswers: number
    correctAnswerPercentage: number
}

export interface OverallStats {
    totalQuizzesTaken: number
    totalQuizzesAvailable: number
    totalQuestionsAnswered: number
    totalCorrectAnswers: number
    totalIncorrectAnswers: number
    overallCorrectPercentage: number
    overallAverageScore: number
    bestQuizScore: number
    worstQuizScore: number
    totalPointsEarned: number
    totalPointsAvailable: number
    timeSpentOnQuizzes?: number 
}

export interface UserProgressData {
    attemptsByDate: {
      date: string
      attempts: number
      averageScore: number
    }[]
    longestStreak: number
    currentStreak: number
}