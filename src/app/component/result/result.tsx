"use client"
import React, { useState, useEffect } from 'react';
import { Brain, Heart, Lightbulb, TrendingUp, RotateCcw, Share2, Download, Eye, Smile, BookOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';


interface QuizResult {
  id: number;
  userId: string;
  score: number;
  createdAt: Date;
  answers: {
    id: number;
    questionId: number;
    selectedAnswer: string;
    isCorrect: boolean;
    question: {
      question: string;
    };
  }[];
}

interface PsychQuizResultsProps {
  result: QuizResult;
  totalQuestions?: number;
  quizType?: string;
}

export default function PsychologicalQuizResults({ 
  result, 
  totalQuestions = 20, 
  quizType = "Psychological Assessment"
}: PsychQuizResultsProps) {
  const router = useRouter();
  const [animationComplete, setAnimationComplete] = useState(false);
  const [scoreAnimation, setScoreAnimation] = useState(0);
  
  const onRetry = () =>{
    localStorage.clear();
    router.push('/quiz');
  }
  const onShare = () => {
    const shareData = {
      title: 'Psychological Quiz Results',
      text: `I scored ${result.score} out of ${totalQuestions} in the ${quizType}. Check it out!`,
      url: window.location.href,
    };
    if (navigator.share) {
      navigator.share(shareData).catch(console.error);
    } else {
      alert('Sharing not supported in this browser.');
    }
  };
  const onDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `quiz_result_${result.id}.json`;
    document.body.appendChild(element);
    element.click();
  };
  const score = result?.score || 0;
  const percentage = Math.round((score / totalQuestions) * 100);
  const correctAnswers = result?.answers?.filter(a => a.isCorrect).length || score;
  const incorrectAnswers = totalQuestions - correctAnswers;
  
  const calculateInsights = () => {
    if (!result?.answers) return { strength: 0, growth: 0, awareness: 0 };
    
    const total = result.answers.length;
    const correct = correctAnswers;
    
    return {
      strength: Math.round((correct / total) * 100),
      growth: Math.round(((total - correct) / total) * 100),
      awareness: Math.round((correct * 0.8 + (total - correct) * 0.3) / total * 100)
    };
  };

  const insights = calculateInsights();

  const getPsychologicalAssessment = (percentage: number) => {
    if (percentage >= 85) return { 
      level: "Excellent Self-Awareness", 
      color: "from-emerald-400 via-teal-400 to-cyan-400", 
      emoji: "🧠",
      message: "You demonstrate exceptional psychological insight and self-understanding. Your responses show deep emotional intelligence and strong mental health awareness.",
      recommendation: "Continue nurturing your mental wellness through mindfulness and self-reflection practices."
    };
    if (percentage >= 70) return { 
      level: "Strong Understanding", 
      color: "from-blue-400 via-indigo-400 to-purple-400", 
      emoji: "💙",
      message: "You show good psychological awareness and understanding of mental health concepts. Your insights reflect healthy emotional processing.",
      recommendation: "Consider exploring advanced mindfulness techniques or journaling to deepen your self-awareness."
    };
    if (percentage >= 55) return { 
      level: "Developing Awareness", 
      color: "from-violet-400 via-purple-400 to-pink-400", 
      emoji: "🌱",
      message: "You're on a positive journey of self-discovery. Your responses indicate growing psychological awareness and emotional insight.",
      recommendation: "Practice daily reflection and consider exploring therapy or counseling for continued growth."
    };
    if (percentage >= 40) return { 
      level: "Growing Understanding", 
      color: "from-amber-400 via-orange-400 to-rose-400", 
      emoji: "🌸",
      message: "You're building your psychological knowledge base.",
      recommendation: "Focus on learning about emotional regulation and stress management techniques."
    };
    return { 
      level: "Beginning Journey", 
      color: "from-rose-400 via-pink-400 to-red-400", 
      emoji: "🌟",
      message: "Every expert was once a beginner",
      recommendation: "Consider speaking with a mental health professional and exploring basic mindfulness practices."
    };
  };

  const assessment = getPsychologicalAssessment(percentage);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 500);

    const scoreTimer = setInterval(() => {
      setScoreAnimation(prev => {
        if (prev < score) {
          return prev + 1;
        }
        clearInterval(scoreTimer);
        return prev;
      });
    }, 120);

    return () => {
      clearTimeout(timer);
      clearInterval(scoreTimer);
    };
  }, [score]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      <div className="w-full max-w-6xl mx-auto mt-30 mb-30">
        <div className={`bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-blue-200/50 shadow-2xl p-4 sm:p-6 lg:p-8 transform transition-all duration-1000 ${
          animationComplete ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}>
          
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 mb-3 sm:mb-4 shadow-lg">
              <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">Assessment Complete</h1>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg">{quizType} Results</p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto mt-3 rounded-full"></div>
          </div>

          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="relative">
              <svg className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 transform -rotate-90" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  stroke="rgba(59, 130, 246, 0.1)"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  stroke="url(#psychGradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 80}`}
                  strokeDashoffset={`${2 * Math.PI * 80 * (1 - percentage / 100)}`}
                  className="transition-all duration-2000 ease-out"
                />
                <defs>
                  <linearGradient id="psychGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="50%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <div className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-800 mb-1 sm:mb-2">
                  {scoreAnimation}<span className="text-lg sm:text-2xl lg:text-3xl text-gray-500">/{totalQuestions}</span>
                </div>
                <div className="text-lg sm:text-xl lg:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  {percentage}%
                </div>
              </div>
            </div>
          </div>

          {/* Assessment Badge */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-gradient-to-r ${assessment.color} text-white font-semibold text-sm sm:text-base lg:text-lg shadow-lg`}>
              <span className="mr-2">{assessment.emoji}</span>
              {assessment.level}
            </div>
          </div>

          {/* Psychological Insights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-emerald-200">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 mb-3 mx-auto">
                <Heart className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-emerald-700 mb-1">{insights.strength}%</div>
                <div className="text-sm font-medium text-emerald-600 mb-2">Emotional Strength</div>
                <div className="text-xs text-emerald-600/80">Your emotional resilience and self-awareness</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-200">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-3 mx-auto">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-700 mb-1">{insights.awareness}%</div>
                <div className="text-sm font-medium text-blue-600 mb-2">Self-Awareness</div>
                <div className="text-xs text-blue-600/80">Your understanding of thoughts and feelings</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-200">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 mb-3 mx-auto">
                <Lightbulb className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-purple-700 mb-1">{insights.growth}%</div>
                <div className="text-sm font-medium text-purple-600 mb-2">Growth Potential</div>
                <div className="text-xs text-purple-600/80">Areas for continued development</div>
              </div>
            </div>
          </div>

          {/* Detailed Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-gray-200 hover:bg-white/80 transition-all duration-300">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-100 mb-2 sm:mb-3 mx-auto">
                <Smile className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-gray-800">{correctAnswers}</div>
                <div className="text-xs sm:text-sm text-gray-600">Correct Insights</div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-gray-200 hover:bg-white/80 transition-all duration-300">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-100 mb-2 sm:mb-3 mx-auto">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-gray-800">{incorrectAnswers}</div>
                <div className="text-xs sm:text-sm text-gray-600">Growth Areas</div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-gray-200 hover:bg-white/80 transition-all duration-300">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 mb-2 sm:mb-3 mx-auto">
                <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-gray-800">{Math.round(percentage/5)}</div>
                <div className="text-xs sm:text-sm text-gray-600">Insight Level</div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-gray-200 hover:bg-white/80 transition-all duration-300 col-span-2 lg:col-span-1">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-indigo-100 mb-2 sm:mb-3 mx-auto">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-gray-800">{totalQuestions}</div>
                <div className="text-xs sm:text-sm text-gray-600">Total Questions</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-blue-200/50">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                  Your Psychological Profile
                </h3>
                <p className="text-sm sm:text-base text-gray-700 mb-4">
                  {assessment.message}
                </p>
                <div className="bg-white/70 rounded-lg p-3 sm:p-4 border border-blue-100">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-yellow-600" />
                    Recommendation for Growth
                  </h4>
                  <p className="text-sm text-gray-700">
                    {assessment.recommendation}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button 
              onClick={onRetry}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
            >
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
              Retake Assessment
            </button>
            
            <button 
              onClick={onShare}
              className="flex items-center justify-center gap-2 bg-white/80 hover:bg-white text-gray-700 font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl transition-all duration-300 border border-gray-200 backdrop-blur-sm text-sm sm:text-base shadow-md"
            >
              <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
              Share Insights
            </button>
            
            <button 
              onClick={onDownload}
              className="flex items-center justify-center gap-2 bg-white/80 hover:bg-white text-gray-700 font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl transition-all duration-300 border border-gray-200 backdrop-blur-sm text-sm sm:text-base shadow-md"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              Download Report
            </button>
          </div>

          <div className="text-center mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
            <p className="text-gray-500 text-xs sm:text-sm">
              Assessment completed on {result?.createdAt ? new Date(result.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}
            </p>
            {result?.id && (
              <p className="text-gray-400 text-xs mt-1">
                Report ID: #{result.id}
              </p>
            )}
            <p className="text-gray-400 text-xs mt-2 italic">
              Remember: This assessment is for educational purposes. For professional mental health support, consult a qualified therapist.
            </p>
          </div>
        </div>

        <div className="fixed inset-0 pointer-events-none overflow-hidden hidden sm:block">
          <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-blue-300/30 rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-indigo-300/40 rounded-full animate-ping"></div>
          <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-purple-300/50 rounded-full animate-bounce"></div>
          <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-teal-300/30 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}