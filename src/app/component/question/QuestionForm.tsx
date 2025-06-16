"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Brain,
  Clock,
  Zap,
} from "lucide-react";
import QuestionNumber from "./QuestionNumber";

type Question = {
  id: number;
  question: string;
  answerA: string;
  answerB: string;
  answerC: string;
  answerD: string;
  answerE: string;
};

type AnswerEntry = {
  questionId: number;
  selectedAnswer: string;
};

const QuizForm = ({ question }: { question: Question }) => {
  const router = useRouter();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const TOTAL_QUESTIONS = 20;

  useEffect(() => {
    setIsLoaded(true);
    const savedAnswers: AnswerEntry[] = JSON.parse(
      localStorage.getItem("quizAnswers") || "[]"
    );
    const existingAnswer = savedAnswers.find(
      (ans) => ans.questionId === question.id
    );
    if (existingAnswer) {
      setSelectedAnswer(existingAnswer.selectedAnswer);
    }
  }, [question.id]);

  const answerOptions = [
    {
      value: "A",
      imageUrl: question.answerA,
      color: "from-indigo-500 to-purple-600",
    },
    {
      value: "B",
      imageUrl: question.answerB,
      color: "from-purple-500 to-pink-600",
    },
    {
      value: "C",
      imageUrl: question.answerC,
      color: "from-pink-500 to-rose-600",
    },
    {
      value: "D",
      imageUrl: question.answerD,
      color: "from-cyan-500 to-blue-600",
    },
    {
      value: "E",
      imageUrl: question.answerE,
      color: "from-emerald-500 to-teal-600",
    },
  ].filter((option) => option.imageUrl);

  const updateLocalStorage = () => {
    if (!selectedAnswer) return;
    const savedAnswers: AnswerEntry[] = JSON.parse(
      localStorage.getItem("quizAnswers") || "[]"
    );
    const otherAnswers = savedAnswers.filter(
      (ans) => ans.questionId !== question.id
    );
    const newAnswers = [
      ...otherAnswers,
      { questionId: question.id, selectedAnswer: selectedAnswer },
    ];
    localStorage.setItem("quizAnswers", JSON.stringify(newAnswers));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    updateLocalStorage();

    if (question.id === TOTAL_QUESTIONS) {
      const finalAnswers = localStorage.getItem("quizAnswers");
      const parsedAnswers = JSON.parse(finalAnswers || "[]");

      if (parsedAnswers.length < TOTAL_QUESTIONS) {
        alert("Please answer all questions before submitting.");
        setIsSubmitting(false);
        return;
      }

      try {
        const response = await fetch("/api/quiz/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: parsedAnswers }),
          cache: "no-store",
        });

        if (!response.ok) throw new Error("Failed to submit the quiz.");

        const result = await response.json();
        localStorage.removeItem("quizAnswers");
        router.push(`/result/${result.attemptId}`);
      } catch (error) {
        console.error("Failed to submit final answers:", error);
        alert("There was an error submitting your quiz.");
        setIsSubmitting(false);
      }
    } else {
      router.push(`/quiz/${question.id + 1}`);
    }
  };

  const handleBack = () => {
    updateLocalStorage();
    if (question.id > 1) {
      router.push(`/quiz/${question.id - 1}`);
    }
  };

  const progressPercentage = (question.id / TOTAL_QUESTIONS) * 100;

  return (
    <div className="min-h-screen mt-10 mb-10 p-5 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>
      <div
        className={`relative z-10 pt-6 pb-8 px-6 transition-all duration-1000 ${
          isLoaded ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center justify-between text-white/80 mb-2">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-medium">Psychology Quiz</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4" />
                <span>
                  Question {question.id} of {TOTAL_QUESTIONS}
                </span>
              </div>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3 backdrop-blur-sm border border-white/20">
              <div
                className="h-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full transition-all duration-700 ease-out relative overflow-hidden"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="relative flex">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                </div>
              </div>
            </div>

            <QuestionNumber
              question={{
                id: question.id,
              }}
              TOTAL_QUESTIONS={TOTAL_QUESTIONS}
              updateLocalStorage={updateLocalStorage}
            ></QuestionNumber>
          </div>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-2">
            Question {question.id}
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full" />
        </div>
        <div
          className={`relative z-10 px-6 transition-all duration-1000 delay-300 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-center mb-12">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000" />
                <div className="relative bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-2">
                  <img
                    src={question.question}
                    alt={`Question ${question.id}`}
                    className="max-w-full max-h-[400px] rounded-xl object-cover shadow-2xl"
                  />
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 gap-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  {answerOptions.slice(0, 3).map((option, index) => (
                    <div
                      key={option.value}
                      className={`transition-all duration-500 delay-${
                        index * 100
                      }`}
                      style={{
                        transform: isLoaded
                          ? "translateY(0)"
                          : "translateY(50px)",
                        opacity: isLoaded ? 1 : 0,
                      }}
                    >
                      <label
                        htmlFor={`answer-${option.value}`}
                        className={`group relative block p-1 rounded-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                          selectedAnswer === option.value
                            ? `bg-gradient-to-r ${option.color} shadow-2xl shadow-purple-500/25`
                            : "bg-white/5 hover:bg-white/10"
                        }`}
                      >
                        {selectedAnswer === option.value && (
                          <div
                            className={`absolute -inset-1 bg-gradient-to-r ${option.color} rounded-2xl blur opacity-60 animate-pulse`}
                          />
                        )}

                        <div
                          className={`relative bg-white/5 backdrop-blur-md border rounded-xl overflow-hidden transition-all duration-300 ${
                            selectedAnswer === option.value
                              ? "border-white/40 bg-white/10"
                              : "border-white/10 group-hover:border-white/20"
                          }`}
                        >
                          {/* Image container */}
                          <div className="relative overflow-hidden">
                            <img
                              src={option.imageUrl}
                              alt={`Option ${option.value}`}
                              className="w-full h-64 object-contain transition-transform duration-500 group-hover:scale-110"
                            />

                            <div
                              className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 ${
                                selectedAnswer === option.value
                                  ? "opacity-30"
                                  : "opacity-0 group-hover:opacity-20"
                              }`}
                            />

                            {selectedAnswer === option.value && (
                              <div className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg animate-scale-in">
                                <Check className="w-5 h-5 text-purple-600" />
                              </div>
                            )}
                          </div>

                          <div className="p-6">
                            <div
                              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto font-bold text-2xl transition-all duration-300 ${
                                selectedAnswer === option.value
                                  ? `bg-gradient-to-r ${option.color} text-white shadow-lg`
                                  : "bg-white/10 text-white/80 group-hover:bg-white/20"
                              }`}
                            >
                              {option.value}
                            </div>
                          </div>
                        </div>

                        <input
                          id={`answer-${option.value}`}
                          type="radio"
                          name="answer"
                          value={option.value}
                          checked={selectedAnswer === option.value}
                          onChange={(e) => setSelectedAnswer(e.target.value)}
                          className="sr-only"
                        />
                      </label>
                    </div>
                  ))}
                </div>

                {answerOptions.length > 3 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {answerOptions.slice(3).map((option, index) => (
                      <div
                        key={option.value}
                        className={`transition-all duration-500 delay-${
                          (index + 3) * 100
                        }`}
                        style={{
                          transform: isLoaded
                            ? "translateY(0)"
                            : "translateY(50px)",
                          opacity: isLoaded ? 1 : 0,
                        }}
                      >
                        <label
                          htmlFor={`answer-${option.value}`}
                          className={`group relative block p-1 rounded-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                            selectedAnswer === option.value
                              ? `bg-gradient-to-r ${option.color} shadow-2xl shadow-purple-500/25`
                              : "bg-white/5 hover:bg-white/10"
                          }`}
                        >
                          {selectedAnswer === option.value && (
                            <div
                              className={`absolute -inset-1 bg-gradient-to-r ${option.color} rounded-2xl blur opacity-60 animate-pulse`}
                            />
                          )}

                          <div
                            className={`relative bg-white/5 backdrop-blur-md border rounded-xl overflow-hidden transition-all duration-300 ${
                              selectedAnswer === option.value
                                ? "border-white/40 bg-white/10"
                                : "border-white/10 group-hover:border-white/20"
                            }`}
                          >
                            <div className="relative overflow-hidden">
                              <img
                                src={option.imageUrl}
                                alt={`Option ${option.value}`}
                                className="w-full h-64 object-contain transition-transform duration-500 group-hover:scale-110"
                              />

                              <div
                                className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 ${
                                  selectedAnswer === option.value
                                    ? "opacity-30"
                                    : "opacity-0 group-hover:opacity-20"
                                }`}
                              />

                              {selectedAnswer === option.value && (
                                <div className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg animate-scale-in">
                                  <Check className="w-5 h-5 text-purple-600" />
                                </div>
                              )}
                            </div>

                            <div className="p-6">
                              <div
                                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto font-bold text-2xl transition-all duration-300 ${
                                  selectedAnswer === option.value
                                    ? `bg-gradient-to-r ${option.color} text-white shadow-lg`
                                    : "bg-white/10 text-white/80 group-hover:bg-white/20"
                                }`}
                              >
                                {option.value}
                              </div>
                            </div>
                          </div>

                          <input
                            id={`answer-${option.value}`}
                            type="radio"
                            name="answer"
                            value={option.value}
                            checked={selectedAnswer === option.value}
                            onChange={(e) => setSelectedAnswer(e.target.value)}
                            className="sr-only"
                          />
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div
                className={`flex flex-col sm:flex-row justify-center gap-4 pt-8 transition-all duration-1000 delay-700 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                {question.id > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={isSubmitting}
                    className="group relative px-8 py-4 bg-white/5 backdrop-blur-md border border-white/20 rounded-xl text-white font-semibold transition-all duration-300 hover:bg-white/10 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                  >
                    <div className="flex items-center gap-2">
                      <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                      Back
                    </div>
                  </button>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || !selectedAnswer}
                  className={`group relative px-8 py-4 font-bold text-white rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 min-w-[200px] ${
                    selectedAnswer
                      ? "bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 shadow-lg hover:shadow-xl hover:shadow-purple-500/25"
                      : "bg-white/10 border border-white/20"
                  }`}
                >
                  {selectedAnswer && !isSubmitting && (
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl blur opacity-60 group-hover:opacity-80 transition duration-300" />
                  )}

                  <div className="relative flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : question.id < TOTAL_QUESTIONS ? (
                      <>
                        Next
                        <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5" />
                        Finish Quiz
                      </>
                    )}
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      ;
      <style jsx>{`
        @keyframes scale-in {
          0% {
            transform: scale(0);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default QuizForm;
