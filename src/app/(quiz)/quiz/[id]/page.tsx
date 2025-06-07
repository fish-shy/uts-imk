import Link from "next/link";
import { prisma } from "@/lib/prisma";
import QuizForm from "@/app/component/quiz/QuizForm";

const Page = async ({ params }: { params: { id: string } }) => {
  const param = await params
  const quizId = parseInt(param.id, 10);

  if (isNaN(quizId)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-white bg-gray-900">
        <h1 className="text-2xl font-bold text-red-500">Invalid Quiz ID</h1>
        <Link
          href="/"
          className="mt-4 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
        >
          Go to Home
        </Link>
      </div>
    );
  }

  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    select: {
      id: true,
      question: true,
      answerA: true,
      answerB: true,
      answerC: true,
      answerD: true,
      answerE: true,
      userAnswer: true,
    },
  });

  if (!quiz) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-white bg-gray-900">
        <h1 className="text-2xl font-bold text-red-500">Quiz not found</h1>
        <p className="text-gray-400">Could not find a quiz with ID: {quizId}</p>
        <Link
          href="/"
          className="mt-4 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
        >
          Go to Home
        </Link>
      </div>
    );
  }

  return <QuizForm quiz={quiz} />;
};

export default Page;