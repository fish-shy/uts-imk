import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json(
        { message: "Invalid Quiz ID" },
        { status: 400 }
      );
    }

    const { userAnswer } = await request.json();

    if (!userAnswer) {
      return NextResponse.json(
        { message: "User answer is required" },
        { status: 400 }
      );
    }

    const updatedQuiz = await prisma.quiz.update({
      where: { id: id },
      data: { userAnswer: userAnswer },
    });

    return NextResponse.json(
      {
        message: "Answer submitted successfully",
        quiz: updatedQuiz,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("UPDATE_ERROR:", error);
    return NextResponse.json(
      { message: "Failed to submit answer", error },
      { status: 500 }
    );
  }
}