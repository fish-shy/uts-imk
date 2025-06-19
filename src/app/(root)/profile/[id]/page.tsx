// app/profile/[id]/page.tsx

import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { format } from "date-fns";
import { auth, signOut } from "@/auth";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProfilePage(props: PageProps) {
  const params = await props.params;
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/auth/signin");
  }
  if (session.user.id !== params.id) {
    redirect(`/profile/${session.user.id}`);
  }
  const user = await prisma.user.findUnique({
    where: { id: await params.id },
    include: {
      attempts: {
        include: {
          answers: {
            include: {
              question: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      },
      _count: {
        select: { attempts: true },
      },
    },
  });

  if (!user) {
    notFound();
  }

  const totalAttempts = user.attempts.length;
  const scores = user.attempts.map((a) => a.score);
  const averageScore = scores.length
    ? scores.reduce((a, b) => a + b, 0) / scores.length
    : 0;
  const bestScore = scores.length ? Math.max(...scores) : 0;
  const totalCorrectAnswers = user.attempts.reduce(
    (sum, a) => sum + a.answers.filter((ans) => ans.isCorrect).length,
    0
  );
  const totalQuestions = user.attempts.reduce(
    (sum, a) => sum + a.answers.length,
    0
  );
  const accuracy = totalQuestions
    ? Math.round((totalCorrectAnswers / totalQuestions) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
            {/* User Info Section */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6">
              {/* Avatar */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || "User"}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-xl sm:text-2xl font-bold text-white">
                    {user.name?.charAt(0).toUpperCase() ||
                      user.email?.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              
              {/* User Details */}
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                  {user.name || "User"}
                </h1>
                <p className="text-gray-600 text-sm sm:text-base break-all sm:break-normal">
                  {user.email}
                </p>
                {user.dateOfBirth && (
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">
                    Born: {format(new Date(user.dateOfBirth), "MMM d, yyyy")}
                  </p>
                )}
                <p className="text-gray-500 text-xs sm:text-sm">
                  Member since {format(new Date(user.createdAt), "MMM yyyy")}
                </p>
              </div>
            </div>

            {/* Sign Out Button */}
            <div className="flex justify-center sm:justify-end">
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 sm:px-6 rounded-lg shadow-md transition-colors duration-300 flex items-center text-sm sm:text-base"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          <StatCard title="Total Quizzes" value={totalAttempts} color="blue" />
          <StatCard
            title="Average Score"
            value={averageScore.toFixed(1)}
            color="green"
          />
          <StatCard title="Best Score" value={bestScore} color="purple" />
          <StatCard title="Accuracy" value={`${accuracy}%`} color="orange" />
        </div>

        {/* Recent Attempts */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
            Recent Attempts
          </h2>
          {user.attempts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No attempts yet.
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {user.attempts.slice(0, 10).map((attempt) => {
                const correct = attempt.answers.filter(
                  (a) => a.isCorrect
                ).length;
                const total = attempt.answers.length;
                const percentage = total
                  ? Math.round((correct / total) * 100)
                  : 0;

                return (
                  <div
                    key={attempt.id}
                    className="border border-gray-200 rounded-lg p-3 sm:p-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                      <div className="flex-1">
                        <p className="text-base sm:text-lg font-semibold text-gray-800">
                          Score: {attempt.score} ({correct}/{total})
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                          {format(new Date(attempt.createdAt), "MMM d, yyyy 'at' h:mm a")}
                        </p>
                      </div>
                      <div className="text-right sm:ml-4">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          percentage >= 80
                            ? "bg-green-100 text-green-800"
                            : percentage >= 60
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                          {percentage}%
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          percentage >= 80
                            ? "bg-green-500"
                            : percentage >= 60
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string | number;
  color: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-6 text-center">
      <div className={`text-xl sm:text-2xl md:text-3xl font-bold text-${color}-600 mb-1 sm:mb-2`}>
        {value}
      </div>
      <div className="text-gray-600 text-xs sm:text-sm md:text-base leading-tight">
        {title}
      </div>
    </div>
  );
}