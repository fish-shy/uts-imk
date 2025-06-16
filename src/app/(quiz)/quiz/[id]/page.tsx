import Link from "next/link";
import { prisma } from "@/lib/prisma";
import QuestionForm from "@/app/component/question/QuestionForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AlertTriangle, Home, Brain } from "lucide-react";

const Page = async ({ params }: {
  params: Promise<{ id: string }>
}) => {
  const session = await auth();
  
  if (!session?.user.id) {
    redirect("/login");
  }

  const { id } = await params;
  const questionId = parseInt(id, 10);
  
  if (isNaN(questionId)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4">

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-40 h-40 md:w-64 md:h-64 bg-red-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-80 md:h-80 bg-orange-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative bg-white/10 backdrop-blur-md border border-white/20 p-6 sm:p-8 md:p-12 rounded-2xl shadow-2xl text-center max-w-lg w-full mx-4">

          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
            Invalid Question
          </h1>
          
          <p className="text-white/70 mb-6 sm:mb-8 text-base sm:text-lg">
            The question ID provided is not valid. Please check the URL and try again.
          </p>

          <Link
            href="/"
            className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 inline-flex items-center gap-2 sm:gap-3 text-sm sm:text-base"
          >
            <Home className="w-4 h-4 sm:w-5 sm:h-5" />
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  const question = await prisma.question.findUnique({
    where: { id: questionId },
    select: {
      id: true,
      question: true,
      answerA: true,
      answerB: true,
      answerC: true,
      answerD: true,
      answerE: true,
    },
  });

  if (!question) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-40 h-40 md:w-64 md:h-64 bg-red-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-80 md:h-80 bg-orange-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative bg-white/10 backdrop-blur-md border border-white/20 p-6 sm:p-8 md:p-12 rounded-2xl shadow-2xl text-center max-w-lg w-full mx-4">

          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
            Question Not Found
          </h1>
          
          <p className="text-white/70 mb-2 text-base sm:text-lg">
            Could not find a question with ID: 
          </p>
          <p className="text-purple-400 font-mono text-lg sm:text-xl mb-6 sm:mb-8 break-all">
            {questionId}
          </p>

          <Link
            href="/"
            className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 inline-flex items-center gap-2 sm:gap-3 text-sm sm:text-base"
          >
            <Home className="w-4 h-4 sm:w-5 sm:h-5" />
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 md:w-64 md:h-64 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-80 md:h-80 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute top-3/4 left-3/4 w-32 h-32 md:w-48 md:h-48 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 pt-4 sm:pt-8 pb-2 sm:pb-4 px-3 sm:px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link 
            href="/"
            className="flex items-center gap-1 sm:gap-2 text-white/60 hover:text-white transition-colors"
          >
            <Home className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>
          
          <div className="flex items-center gap-1 sm:gap-2 text-white/80">
            <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
            <span className="text-xs sm:text-sm font-medium">Psychology Quiz</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center p-3 sm:p-4 pt-4 sm:pt-8">
        <div className="w-full max-w-4xl">
          <QuestionForm question={question} />
        </div>
      </div>
    </div>
  );
};

export default Page;