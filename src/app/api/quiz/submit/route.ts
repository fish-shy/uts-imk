
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

type AnswerPayload = {
  questionId?: number | null;
  selectedAnswer?: string | null;
};

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Not authorized" }, { status: 401 });
  }

  const userId = session.user.id;
  
  // Debug logging
  console.log("DEBUG - Session user:", {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name
  });

  try {
    const body = await request.json();
    const userAnswers: AnswerPayload[] = body.answers;

    if (!userAnswers || userAnswers.length === 0) {
      return NextResponse.json({ message: "No answers provided." }, { status: 400 });
    }

    const cleanUserAnswers = userAnswers.filter(
      (ans): ans is { questionId: number; selectedAnswer: string } =>
        ans.questionId != null && ans.selectedAnswer != null
    );

    if (cleanUserAnswers.length === 0) {
      return NextResponse.json({ message: "Submission contains no valid answers." }, { status: 400 });
    }

    const questionIds = cleanUserAnswers.map((ans) => ans.questionId);

    const result = await prisma.$transaction(async (tx) => {
      const existingUser = await tx.user.findUnique({
        where: { id: userId },
        select: { id: true }
      });

      if (!existingUser) {
        throw new Error("User not found"); 
      }

      const questions = await tx.question.findMany({
        where: { id: { in: questionIds } },
        select: { id: true, correctAnswer: true },
      });

      if (questions.length !== questionIds.length) {
        throw new Error("Some questions not found");
      }

      const correctAnswersMap = new Map(
        questions.map((q) => [q.id, q.correctAnswer])
      );

      let finalScore = 0;
      const processedAnswers = cleanUserAnswers.map((userAnswer) => {
        const isCorrect =
          correctAnswersMap.get(userAnswer.questionId) ===
          userAnswer.selectedAnswer;
        if (isCorrect) {
          finalScore++;
        }
        return {
          questionId: userAnswer.questionId,
          selectedAnswer: userAnswer.selectedAnswer,
          isCorrect: isCorrect,
        };
      });

      const attempt = await tx.quizAttempt.create({
        data: {
          userId: userId,
          score: finalScore,
          answers: {
            create: processedAnswers,
          },
        },
      });

      return attempt;
    });

    return NextResponse.json(
      {
        message: "Quiz submitted successfully!",
        attemptId: result.id,
        score: result.score,
        totalQuestions: cleanUserAnswers.length,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("QUIZ_SUBMISSION_API_ERROR:", error);
    
    // More detailed error logging
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }

    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { message: "An error occurred while submitting the quiz.", error: errorMessage },
      { status: 500 }
    );
  }
}