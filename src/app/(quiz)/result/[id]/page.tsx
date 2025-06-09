import PsychologicalQuizResults from "@/app/component/result/result";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import React from "react";


type Props = {
  params: Promise<{ id: any }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const result = async ({ params,searchParams } : Props) => {
  const session = await auth();
  if(!session?.user.id){
    redirect('/')
  }
  const {id} = await params;
  const result = await prisma.quizAttempt.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      answers: {
        include: {
          question: {
            select: {
              question: true,
            },
          },
        },
      },
    },
  });
  if(session?.user.id != result?.userId ){
    redirect('/')
  }
  if(!result){
    return (
      <div>
        Nothing here
      </div>
    )
  }
  
  if (!result) {
    return <div>Quiz result not found</div>;
  }
  return <PsychologicalQuizResults result={result} />;
};

export default result;
