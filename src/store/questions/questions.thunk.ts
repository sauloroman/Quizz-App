import type { Dispatch } from "@reduxjs/toolkit";
import type { Answer, CreateQuestionWithAnswers, EditQuestionWithAnswers, Question, QuestionWithAnswers } from "../../interfaces/quizzly.interface";
import { addQuestion, deleteQuestion, setCreatingNewQuestion, setIsLoading, setQuestions, updateQuestion } from "./questions.slice";
import { setAlert } from "../ui/ui.slice";
import { formatErrorFromFirebase } from "../../shared/helpers/format-firebase-errors";
import { AlertType } from "../../interfaces/ui.interface";
import { FirebaseDB } from "../../config/firebase/config";
import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore/lite";
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

export const startUpdatingQuestionForQuiz = (dataQuestion: EditQuestionWithAnswers) => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        dispatch(setIsLoading(true));
        try {
            const { quizzes: { quizSelected } } = getState();
            const { answers, question } = dataQuestion;

            if ( !question ) throw new Error(`La pregunta es obligatoria`)
            if ( !answers ) throw new Error(`Las respesutas de la pregunta song obligatorias`)

            if (!quizSelected) return;
            const quizId = quizSelected.id;

            const questionRef = doc(FirebaseDB, `quizzes/${quizId}/questions/${question.id}`);
            await setDoc(questionRef, { ...question, quizId }, { merge: true });

            const updatedQuestion: Question = {
                id: question.id,
                points: question.points,
                questionText: question.questionText,
                quizId: quizId,
                createdAt: new Date(),
            };

            const answersArr: Answer[] = [];

            for (let index = 0; index < answers.length; index++) {
                const answer = answers[index];
                const answerRef = doc(
                    FirebaseDB,
                    `quizzes/${quizId}/questions/${question.id}/answers`,
                    answer.id || doc(collection(FirebaseDB, `quizzes/${quizId}/questions/${question.id}/answers`)).id
                );

                const newAnswer: Answer = {
                    id: answerRef.id,
                    questionId: question.id,
                    answerText: answer.answerText,
                    isCorrect: answer.isCorrect,
                };

                await setDoc(answerRef, newAnswer, { merge: true });
                answersArr.push(newAnswer);
            }

            dispatch(
                updateQuestion({
                    question: updatedQuestion,
                    answers: answersArr,
                })
            );

            dispatch(
                setAlert({
                    isOpen: true,
                    title: "Preguntas",
                    text: "Pregunta actualizada correctamente",
                    type: AlertType.success,
                })
            );

            dispatch(setCreatingNewQuestion(false))
        } catch (error) {
            console.error(error);
            dispatch(
                setAlert({
                    isOpen: true,
                    title: "Error - Actualizar Pregunta En Quiz",
                    text: formatErrorFromFirebase(error),
                    type: AlertType.error,
                })
            );
        } finally {
            dispatch(setIsLoading(false));
        }
    };
};


export const startDeletingQuestionForQuiz = ( quizId: string, questionId: string ) => {
    return async ( dispatch: Dispatch ) => {
        dispatch(setIsLoading(false));
        try {
            if ( !questionId ) throw new Error('El ID de la pregunta es necesaria para eliminar')

            const questionRef = doc(FirebaseDB, `quizzes/${quizId}/questions`, questionId)
            await deleteDoc(questionRef)

            dispatch(deleteQuestion(questionId))

            dispatch(setAlert({
                isOpen: true,
                title: 'Éxito',
                text: 'Pregunta eliminada correctamente',
                type: AlertType.success,
            }))
        } catch(error) {
            console.error(error);
            dispatch(
                setAlert({
                    isOpen: true,
                    title: "Error - Eliminar Pregunta En Quiz",
                    text: formatErrorFromFirebase(error),
                    type: AlertType.error,
                })
            );
        } finally {
            dispatch(setIsLoading(false));
        }
    }
}