"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type Quiz = {
  id: number;
  question: string | null;
  answerA: string | null;
  answerB: string | null;
  answerC: string | null;
  answerD: string | null;
  answerE: string | null;
  userAnswer: string | null;
};

const QuizForm = ({ quiz }: { quiz: Quiz }) => {
  const router = useRouter();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(
    quiz.userAnswer
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const answerOptions = [
    { value: "A", imageSrc: quiz.answerA },
    { value: "B", imageSrc: quiz.answerB },
    { value: "C", imageSrc: quiz.answerC },
    { value: "D", imageSrc: quiz.answerD },
    { value: "E", imageSrc: quiz.answerE },
  ].filter((option) => option.imageSrc);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!selectedAnswer) {
      alert("Please select an answer.");
      setIsSubmitting(false);
      return;
    }

    try {
      await fetch(`/api/quiz/${quiz.id}`, {
        method: "PUT", // Use the correct HTTP method
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userAnswer: selectedAnswer }),
      });

      // Navigate to the next question
      if (quiz.id < 20) {
        router.push(`/quiz/${quiz.id + 1}`);
      } else {
        router.push("/result");
      }
    } catch (error) {
      console.error("Failed to submit answer:", error);
      alert("There was an error submitting your answer. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
      if (quiz.id > 1) {
          router.push(`/quiz/${quiz.id - 1}`)
      }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-gray-900 text-white mt-10">
      <div className="bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-4xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
          Question {quiz.id}
        </h1>
        {quiz.question && (
          <div className="mb-8">
            <img
              className="rounded-xl shadow-lg mx-auto w-full max-w-md sm:max-w-lg border-2 border-gray-700"
              src={quiz.question}
              alt={`Question ${quiz.id}`}
              width={500}
            />
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 justify-center">
            {answerOptions.map((option) => (
              <label
                key={option.value}
                htmlFor={`answer-${option.value}`}
                className={`block cursor-pointer p-3 sm:p-4 bg-gray-700 rounded-lg shadow-md hover:bg-gray-600 transition-all duration-150 ease-in-out ${
                  selectedAnswer === option.value
                    ? "ring-2 ring-blue-500"
                    : "focus-within:ring-2 focus-within:ring-blue-500"
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  {option.imageSrc && (
                    <img
                      className="rounded-md mb-3 w-full h-auto max-h-48 object-contain"
                      src={option.imageSrc}
                      alt={`Option ${option.value}`}
                    />
                  )}
                  <div className="flex items-center">
                    <input
                      id={`answer-${option.value}`}
                      type="radio"
                      name="answer"
                      value={option.value}
                      checked={selectedAnswer === option.value}
                      onChange={(e) => setSelectedAnswer(e.target.value)}
                      className="mr-2 accent-blue-500 h-5 w-5"
                      required
                    />
                    <span className="font-medium text-sm sm:text-base">
                      Option {option.value}
                    </span>
                  </div>
                </div>
              </label>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            {quiz.id > 1 && (
              <button
                type="button" // Change type to 'button' to prevent form submission
                onClick={handleBack}
                disabled={isSubmitting}
                className="w-full sm:w-auto text-center px-6 py-3 bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors duration-150 font-semibold disabled:opacity-50"
              >
                Back
              </button>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto text-center px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-150 font-semibold disabled:opacity-50"
            >
              {isSubmitting
                ? "Submitting..."
                : quiz.id < 20
                ? "Next"
                : "Finish Quiz"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuizForm;