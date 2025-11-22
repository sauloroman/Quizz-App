import type { AnswerStatus } from "../../interfaces/ui.interface"

export const getAnswerStatus = (isCorrect: boolean): AnswerStatus => {
  return isCorrect
    ? { icon: 'bx-check-circle', color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900' }
    : { icon: 'bx-x-circle', color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900' }
}
