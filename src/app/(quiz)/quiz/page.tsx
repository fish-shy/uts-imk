import Link from 'next/link';
import React from 'react';
import { Brain, ArrowRight,  Target, Trophy } from 'lucide-react';

const QuizStartPage = () => {
  const quizFeatures = [
    { icon: <Target className="w-5 h-5" />, text: "20 questions" },
    { icon: <Trophy className="w-5 h-5" />, text: "Instant results" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative bg-white/10 backdrop-blur-md border border-white/20 p-8 sm:p-12 rounded-2xl shadow-2xl text-center max-w-lg w-full">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Brain className="w-8 h-8 text-white" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Welcome to the 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"> Psychology Quiz!</span>
        </h1>

        <p className="text-white/70 mb-8 text-lg leading-relaxed">
          Test your knowledge of fascinating psychological concepts. Are you ready to challenge your mind and discover new insights?
        </p>

        {/* Quiz features */}
        <div className="flex justify-center gap-6 mb-8">
          {quizFeatures.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-white/60 text-sm">
              <div className="text-purple-400">
                {feature.icon}
              </div>
              <span>{feature.text}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Link
          href="/quiz/1"
          className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 inline-flex items-center gap-3 w-full sm:w-auto justify-center"
        >
          <span className="relative z-10 flex items-center gap-3">
            Start Quiz
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>

        {/* Small encouragement text */}
        <p className="text-white/50 text-sm mt-4">
          No time limit • Multiple choice • Fun & educational
        </p>
      </div>
    </div>
  );
};

export default QuizStartPage;