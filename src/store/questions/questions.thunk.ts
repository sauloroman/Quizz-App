import type { Dispatch } from "@reduxjs/toolkit";
import type { Answer, CreateQuestionWithAnswers, Question, QuestionWithAnswers } from "../../interfaces/quizzly.interface";
import { addQuestion, setCreatingNewQuestion, setIsLoading, setQuestions } from "./questions.slice";
import { setAlert } from "../ui/ui.slice";
import { formatErrorFromFirebase } from "../../shared/helpers/format-firebase-errors";
import { AlertType } from "../../interfaces/ui.interface";
import { FirebaseDB } from "../../config/firebase/config";
import { collection, doc, getDocs, setDoc } from "firebase/firestore/lite";
import type { RootState } from "../store";

export const startGettingQuestionsFromQuiz = (quizId: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(setIsLoading(true));
        try {
            const questionsRef = collection(FirebaseDB, `quizzes/${quizId}/questions`);
            const questionsSnapshot = await getDocs(questionsRef);

            const questions: QuestionWithAnswers[] = [];

            const questionPromises = questionsSnapshot.docs.map(async (doc) => {
                const data = doc.data();

                const question: Question = {
                    id: doc.id,
                    quizId: data.quizId,
                    points: data.points,
                    questionText: data.questionText,
                    createdAt: data.createdAt?.toDate() || new Date(),
                };

                const answersRef = collection(FirebaseDB, `quizzes/${quizId}/questions/${question.id}/answers`);
                const answersSnapshot = await getDocs(answersRef);

                const answersQuestion: Answer[] = [];

                answersSnapshot.docs.forEach((answerDoc) => {
                    const answerData = answerDoc.data();
                    const answer: Answer = {
                        id: answerDoc.id,
                        questionId: question.id,
                        answerText: answerData.answerText,
                        isCorrect: answerData.isCorrect,
                    };
                    answersQuestion.push(answer);
                });

                return {
                    question,
                    answers: answersQuestion,
                };
            });

            const loadedQuestions = await Promise.all(questionPromises);
            questions.push(...loadedQuestions);

            dispatch(setQuestions(questions));
        } catch (error) {
            console.error(error);
            dispatch(
                setAlert({
                    isOpen: true,
                    title: "Error - Obtener Preguntas del Quiz",
                    text: formatErrorFromFirebase(error),
                    type: AlertType.error,
                })
            );
        } finally {
            dispatch(setIsLoading(false));
        }
    };
};

export const startCreatingQuestionsForQuiz = (dataQuestion: CreateQuestionWithAnswers) => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        dispatch(setIsLoading(true));
        try {
            const { quizzes: { quizSelected } } = getState();
            const { answers, question } = dataQuestion;

            if (!quizSelected) return;
            const quizId = quizSelected.id;

            const questionRef = doc(collection(FirebaseDB, `quizzes/${quizId}/questions`));
            await setDoc(questionRef, { ...question, quizId });

            const newQuestion: Question = {
                id: questionRef.id,
                points: question.points,
                questionText: question.questionText,
                quizId: quizId,
                createdAt: new Date(),
            };

            const answerCollectionRef = collection(
                FirebaseDB,
                `quizzes/${quizId}/questions/${questionRef.id}/answers`
            );
            const answersArr: Answer[] = [];

            for (const answer of answers) {
                const answerRef = doc(answerCollectionRef);
                const newAnswer: Answer = {
                    id: answerRef.id,
                    questionId: questionRef.id,
                    answerText: answer.answerText,
                    isCorrect: answer.isCorrect,
                };
                await setDoc(answerRef, newAnswer);
                answersArr.push(newAnswer);
            }

            dispatch(
                addQuestion({
                    question: newQuestion,
                    answers: answersArr,
                })
            );

            dispatch(
                setAlert({
                    isOpen: true,
                    title: "Preguntas",
                    text: "Pregunta creada correctamente",
                    type: AlertType.success,
                })
            );

            dispatch(setCreatingNewQuestion(false))
        } catch (error) {
            console.error(error);
            dispatch(
                setAlert({
                    isOpen: true,
                    title: "Error - Crear Pregunta En Quiz",
                    text: formatErrorFromFirebase(error),
                    type: AlertType.error,
                })
            );
        } finally {
            dispatch(setIsLoading(false));
        }
    };
};