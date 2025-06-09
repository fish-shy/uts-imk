// app/profile/[id]/page.tsx

import { prisma } from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import { format } from 'date-fns';
import { auth } from '@/auth';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProfilePage(props: PageProps) {
  const params = await props.params;
  const session = await auth();

  if (!session?.user?.email) {
    redirect('/auth/signin');
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
        orderBy: { createdAt: 'desc' },
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
  const averageScore = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
  const bestScore = scores.length ? Math.max(...scores) : 0;
  const totalCorrectAnswers = user.attempts.reduce(
    (sum, a) => sum + a.answers.filter((ans) => ans.isCorrect).length,
    0
  );
  const totalQuestions = user.attempts.reduce((sum, a) => sum + a.answers.length, 0);
  const accuracy = totalQuestions ? Math.round((totalCorrectAnswers / totalQuestions) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-30 mb-30">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name || 'User'}
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold text-white">
                  {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{user.name || 'User'}</h1>
              <p className="text-gray-600">{user.email}</p>
              {user.dateOfBirth && (
                <p className="text-gray-500 text-sm">
                  Born: {format(new Date(user.dateOfBirth), 'MMMM d, yyyy')}
                </p>
              )}
              <p className="text-gray-500 text-sm">
                Member since {format(new Date(user.createdAt), 'MMMM yyyy')}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Quizzes" value={totalAttempts} color="blue" />
          <StatCard title="Average Score" value={averageScore.toFixed(1)} color="green" />
          <StatCard title="Best Score" value={bestScore} color="purple" />
          <StatCard title="Accuracy" value={`${accuracy}%`} color="orange" />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Attempts</h2>
          {user.attempts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No  attempts yet.</div>
          ) : (
            <div className="space-y-4">
              {user.attempts.slice(0, 10).map((attempt) => {
                const correct = attempt.answers.filter((a) => a.isCorrect).length;
                const total = attempt.answers.length;
                const percentage = total ? Math.round((correct / total) * 100) : 0;

                return (
                  <div key={attempt.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-lg font-semibold text-gray-800">
                          Score: {attempt.score} ({correct}/{total})
                        </p>
                        <p className="text-sm text-gray-500">
                          {format(new Date(attempt.createdAt), 'PPpp')}
                        </p>
                      </div>
                     
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          percentage >= 80
                            ? 'bg-green-500'
                            : percentage >= 60
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
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
    <div className="bg-white rounded-lg shadow-md p-6 text-center">
      <div className={`text-3xl font-bold text-${color}-600 mb-2`}>{value}</div>
      <div className="text-gray-600">{title}</div>
    </div>
  );
}
