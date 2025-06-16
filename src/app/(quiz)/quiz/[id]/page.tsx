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
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative bg-white/10 backdrop-blur-md border border-white/20 p-8 sm:p-12 rounded-2xl shadow-2xl text-center max-w-lg w-full">

          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">
            Invalid Question
          </h1>
          
          <p className="text-white/70 mb-8 text-lg">
            The question ID provided is not valid. Please check the URL and try again.
          </p>

          <Link
            href="/"
            className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 inline-flex items-center gap-3"
          >
            <Home className="w-5 h-5" />
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
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative bg-white/10 backdrop-blur-md border border-white/20 p-8 sm:p-12 rounded-2xl shadow-2xl text-center max-w-lg w-full">

          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">
            Question Not Found
          </h1>
          
          <p className="text-white/70 mb-2 text-lg">
            Could not find a question with ID: 
          </p>
          <p className="text-purple-400 font-mono text-xl mb-8">
            {questionId}
          </p>

          <Link
            href="/"
            className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 inline-flex items-center gap-3"
          >
            <Home className="w-5 h-5" />
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute top-3/4 left-3/4 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 pt-8 pb-4 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link 
            href="/"
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <Home className="w-5 h-5" />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>
          
          <div className="flex items-center gap-2 text-white/80">
            <Brain className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-medium">Psychology Quiz</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center p-4 pt-8">
        <div className="w-full max-w-4xl">
          <QuestionForm question={question} />
        </div>
      </div>
    </div>
  );
};

export default Page;