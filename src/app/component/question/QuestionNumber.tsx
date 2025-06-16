"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type AnswerEntry = {
    questionId: number;
    selectedAnswer: string;
};

type QuestionNumberProps = {
    question: { id: number };
    TOTAL_QUESTIONS: number;
    updateLocalStorage: () => void;
};

const QuestionNumber = ({ question, TOTAL_QUESTIONS, updateLocalStorage }: QuestionNumberProps) => {
    const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
    const router = useRouter();

    useEffect(() => {
        const savedAnswers: AnswerEntry[] = JSON.parse(
            localStorage.getItem("quizAnswers") || "[]"
        );
        setAnsweredQuestions(savedAnswers.map((ans) => ans.questionId));
    }, []);

    const navigateToQuestion = (questionNumber: number) => {
        updateLocalStorage();
        router.push(`/quiz/${questionNumber}`);
    };

    return (
        <div className="flex justify-center my-6 h-fit w-full">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4">
                <div className="text-white/80 text-sm mb-2 text-center font-medium">
                    Question Navigator
                </div>
                <div className="grid grid-cols-5 gap-2">
                    {Array.from({ length: TOTAL_QUESTIONS }, (_, i) => i + 1).map(
                        (num) => (
                            <button
                                key={num}
                                onClick={() => navigateToQuestion(num)}
                                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                                    num === question.id
                                        ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold"
                                        : answeredQuestions.includes(num)
                                        ? "bg-emerald-500/30 text-white border border-emerald-500/50"
                                        : "bg-white/5 text-white/70 border border-white/10 hover:bg-white/15"
                                }`}
                                type="button"
                            >
                                {num}
                                {answeredQuestions.includes(num) && num !== question.id && (
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full" />
                                )}
                            </button>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuestionNumber;
