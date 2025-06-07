import Link from 'next/link';
import React from 'react';

const QuizStartPage = () => {
  return (
    <div className="min-h-screen     flex flex-col items-center justify-center p-4 text-white">
      <div className="bg-white dark:bg-slate-800 p-8 sm:p-12 rounded-xl shadow-2xl text-center max-w-lg w-full">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Welcome to the Psychology Quiz!
        </h1>
        <p className="text-gray-600 dark:text-slate-300 mb-8 text-lg">
          Test your knowledge of fascinating psychological concespts. Are you ready to challenge your mind?
        </p>
        <Link
          href="/quiz/1"
          className="inline-block font-semibold py-3 px-8 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-all duration-150 ease-in-out bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500 text-lg w-full sm:w-auto"
        >
          Start Quiz
        </Link>
      </div>

    </div>
  );
};

export default QuizStartPage;