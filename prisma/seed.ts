import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sampleQuizzes = [
  {
    question: '/images/Soal-Psikologi/117.png',
    answerA: '/images/Jawaban-no-117-128/A.png',
    answerB: '/images/Jawaban-no-117-128/B.png',
    answerC: '/images/Jawaban-no-117-128/C.png',
    answerD: '/images/Jawaban-no-117-128/D.png',
    answerE: '/images/Jawaban-no-117-128/E.png',
    correctAnswer: 'A',
  },
  {
    question: '/images/Soal-Psikologi/118.png',
    answerA: '/images/Jawaban-no-117-128/A.png',
    answerB: '/images/Jawaban-no-117-128/B.png',
    answerC: '/images/Jawaban-no-117-128/C.png',
    answerD: '/images/Jawaban-no-117-128/D.png',
    answerE: '/images/Jawaban-no-117-128/E.png',
    correctAnswer: 'C',
  },
  {
    question: '/images/Soal-Psikologi/119.png',
    answerA: '/images/Jawaban-no-117-128/A.png',
    answerB: '/images/Jawaban-no-117-128/B.png',
    answerC: '/images/Jawaban-no-117-128/C.png',
    answerD: '/images/Jawaban-no-117-128/D.png',
    answerE: '/images/Jawaban-no-117-128/E.png',
    correctAnswer: 'B',
  },
  {
    question: '/images/Soal-Psikologi/120.png',
    answerA: '/images/Jawaban-no-117-128/A.png',
    answerB: '/images/Jawaban-no-117-128/B.png',
    answerC: '/images/Jawaban-no-117-128/C.png',
    answerD: '/images/Jawaban-no-117-128/D.png',
    answerE: '/images/Jawaban-no-117-128/E.png',
    correctAnswer: 'A',
  },
  {
    question: '/images/Soal-Psikologi/121.png',
    answerA: '/images/Jawaban-no-117-128/A.png',
    answerB: '/images/Jawaban-no-117-128/B.png',
    answerC: '/images/Jawaban-no-117-128/C.png',
    answerD: '/images/Jawaban-no-117-128/D.png',
    answerE: '/images/Jawaban-no-117-128/E.png',
    correctAnswer: 'D',
  },
  {
    question: '/images/Soal-Psikologi/122.png',
    answerA: '/images/Jawaban-no-117-128/A.png',
    answerB: '/images/Jawaban-no-117-128/B.png',
    answerC: '/images/Jawaban-no-117-128/C.png',
    answerD: '/images/Jawaban-no-117-128/D.png',
    answerE: '/images/Jawaban-no-117-128/E.png',
    correctAnswer: 'B',
  },
  {
    question: '/images/Soal-Psikologi/123.png',
    answerA: '/images/Jawaban-no-117-128/A.png',
    answerB: '/images/Jawaban-no-117-128/B.png',
    answerC: '/images/Jawaban-no-117-128/C.png',
    answerD: '/images/Jawaban-no-117-128/D.png',
    answerE: '/images/Jawaban-no-117-128/E.png',
    correctAnswer: 'C',
  },
  {
    question: '/images/Soal-Psikologi/124.png',
    answerA: '/images/Jawaban-no-117-128/A.png',
    answerB: '/images/Jawaban-no-117-128/B.png',
    answerC: '/images/Jawaban-no-117-128/C.png',
    answerD: '/images/Jawaban-no-117-128/D.png',
    answerE: '/images/Jawaban-no-117-128/E.png',
    correctAnswer: 'E',
  },
  {
    question: '/images/Soal-Psikologi/125.png',
    answerA: '/images/Jawaban-no-117-128/A.png',
    answerB: '/images/Jawaban-no-117-128/B.png',
    answerC: '/images/Jawaban-no-117-128/C.png',
    answerD: '/images/Jawaban-no-117-128/D.png',
    answerE: '/images/Jawaban-no-117-128/E.png',
    correctAnswer: 'E',
  },
  {
    question: '/images/Soal-Psikologi/126.png',
    answerA: '/images/Jawaban-no-117-128/A.png',
    answerB: '/images/Jawaban-no-117-128/B.png',
    answerC: '/images/Jawaban-no-117-128/C.png',
    answerD: '/images/Jawaban-no-117-128/D.png',
    answerE: '/images/Jawaban-no-117-128/E.png',
    correctAnswer: 'D',
  },
  {
    question: '/images/Soal-Psikologi/127.png',
    answerA: '/images/Jawaban-no-117-128/A.png',
    answerB: '/images/Jawaban-no-117-128/B.png',
    answerC: '/images/Jawaban-no-117-128/C.png',
    answerD: '/images/Jawaban-no-117-128/D.png',
    answerE: '/images/Jawaban-no-117-128/E.png',
    correctAnswer: 'E',
  },
  {
    question: '/images/Soal-Psikologi/128.png',
    answerA: '/images/Jawaban-no-117-128/A.png',
    answerB: '/images/Jawaban-no-117-128/B.png',
    answerC: '/images/Jawaban-no-117-128/C.png',
    answerD: '/images/Jawaban-no-117-128/D.png',
    answerE: '/images/Jawaban-no-117-128/E.png',
    correctAnswer: 'B',
  },
  // New entries from 129 to 136
  {
    question: '/images/Soal-Psikologi/129.png',
    answerA: '/images/Jawaban-no-129-136/A.png',
    answerB: '/images/Jawaban-no-129-136/B.png',
    answerC: '/images/Jawaban-no-129-136/C.png',
    answerD: '/images/Jawaban-no-129-136/D.png',
    answerE: '/images/Jawaban-no-129-136/E.png',
    correctAnswer: 'D',
  },
  {
    question: '/images/Soal-Psikologi/130.png',
    answerA: '/images/Jawaban-no-129-136/A.png',
    answerB: '/images/Jawaban-no-129-136/B.png',
    answerC: '/images/Jawaban-no-129-136/C.png',
    answerD: '/images/Jawaban-no-129-136/D.png',
    answerE: '/images/Jawaban-no-129-136/E.png',
    correctAnswer: 'C',
  },
  {
    question: '/images/Soal-Psikologi/131.png',
    answerA: '/images/Jawaban-no-129-136/A.png',
    answerB: '/images/Jawaban-no-129-136/B.png',
    answerC: '/images/Jawaban-no-129-136/C.png',
    answerD: '/images/Jawaban-no-129-136/D.png',
    answerE: '/images/Jawaban-no-129-136/E.png',
    correctAnswer: 'B', 
  },
  {
    question: '/images/Soal-Psikologi/132.png',
    answerA: '/images/Jawaban-no-129-136/A.png',
    answerB: '/images/Jawaban-no-129-136/B.png',
    answerC: '/images/Jawaban-no-129-136/C.png',
    answerD: '/images/Jawaban-no-129-136/D.png',
    answerE: '/images/Jawaban-no-129-136/E.png',
    correctAnswer: 'A',
  },
  {
    question: '/images/Soal-Psikologi/133.png',
    answerA: '/images/Jawaban-no-129-136/A.png',
    answerB: '/images/Jawaban-no-129-136/B.png',
    answerC: '/images/Jawaban-no-129-136/C.png',
    answerD: '/images/Jawaban-no-129-136/D.png',
    answerE: '/images/Jawaban-no-129-136/E.png',
    correctAnswer: 'B',
  },
  {
    question: '/images/Soal-Psikologi/134.png',
    answerA: '/images/Jawaban-no-129-136/A.png',
    answerB: '/images/Jawaban-no-129-136/B.png',
    answerC: '/images/Jawaban-no-129-136/C.png',
    answerD: '/images/Jawaban-no-129-136/D.png',
    answerE: '/images/Jawaban-no-129-136/E.png',
    correctAnswer: 'D',
  },
  {
    question: '/images/Soal-Psikologi/135.png',
    answerA: '/images/Jawaban-no-129-136/A.png',
    answerB: '/images/Jawaban-no-129-136/B.png',
    answerC: '/images/Jawaban-no-129-136/C.png',
    answerD: '/images/Jawaban-no-129-136/D.png',
    answerE: '/images/Jawaban-no-129-136/E.png',
    correctAnswer: 'C',
  },
  {
    question: '/images/Soal-Psikologi/136.png',
    answerA: '/images/Jawaban-no-129-136/A.png',
    answerB: '/images/Jawaban-no-129-136/B.png',
    answerC: '/images/Jawaban-no-129-136/C.png',
    answerD: '/images/Jawaban-no-129-136/D.png',
    answerE: '/images/Jawaban-no-129-136/E.png',
    correctAnswer: 'A',
  },
];

async function main() {
  console.log('Start seeding quizzes...');

  for (const quizData of sampleQuizzes) {
    try {
      const quiz = await prisma.question.create({
        data: quizData,
      });
      console.log(`Created quiz with id: ${quiz.id} - Question path: "${quiz.question}"`);
    } catch (error) {
      console.error(`Error creating quiz with question path: "${quizData.question}"`, error);
    }
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    // Disconnect Prisma Client
    await prisma.$disconnect();
    console.log('Prisma Client disconnected.');
  });