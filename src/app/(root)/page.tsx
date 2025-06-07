import { auth } from '@/auth';
import Link from 'next/link';
import React from 'react'

const Page = async () => {
  const avatar = "/images/avatar-1.png"
  const testimonials = [
    {
      quote: "This psychology quiz was incredibly insightful! I learned so much about myself in a really engaging way.",
      name: 'Jamie L.',
      role: 'Curious Learner',
      avatarUrl: avatar, 
    },
    {
      quote: "A fantastic way to challenge my understanding of psychological concepts. The questions were thought-provoking and well-crafted.",
      name: 'Chris B.',
      role: 'Psychology Enthusiast',
      avatarUrl: avatar,
    },
    {
      quote: 'I loved tracking my score and seeing the detailed explanations. It really helped solidify my knowledge!',
      name: 'Pat N.',
      role: 'Student',
      avatarUrl: avatar,
    },
  ];

  const quizDetails = {
    title: "The Ultimate Psychology Challenge",
    description: "Dive deep into the fascinating world of psychology with our comprehensive quiz. Test your understanding of core concepts, famous experiments, and influential theories. Whether you're a student, a professional, or just curious about the human mind, this quiz offers a stimulating and educational experience.",
    imageUrl: "/images/psychology-quiz-main.jpg", 
    points: [
      "Expertly crafted questions covering diverse psychological topics.",
      "Instant feedback and detailed explanations for each answer.",
      "Track your score and challenge yourself to improve.",
      "Gain a deeper understanding of human behavior and mental processes."
    ]
  };
  return (
    <div>
      <div className="relative isolate overflow-hidden pt-14"> 
        <img
          src="/images/hero-quiz-psychology.jpg" 
          alt="Psychology Quiz Illustration"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20 dark:opacity-30"
        />
        <div className="mx-auto max-w-2xl py-24 sm:py-32 lg:py-40 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
            Discover Your Inner Psychologist
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-700 dark:text-neutral-300">
            Ready for a deep dive into the human mind? Take our engaging Psychology Quiz and uncover fascinating insights.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/quiz"
              className="rounded-md bg-indigo-600 px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Take the Psychology Quiz Now
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-16 sm:py-24 dark:bg-zinc-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400">Why You'll Love This Quiz</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              An Unparalleled Learning Experience
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-neutral-400">
              Our Psychology Quiz isn't just about right or wrong answers; it's about understanding the 'why' behind human thought and behavior.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-neutral-100">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 dark:bg-indigo-500">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>
                  </div>
                  Expertly Curated Questions
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-neutral-400">
                  <p className="flex-auto">Dive into questions designed by psychology enthusiasts to challenge your knowledge and spark curiosity.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-neutral-100">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-600 dark:bg-green-500">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>
                  </div>
                  Insightful Feedback
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-neutral-400">
                  <p className="flex-auto">Don't just get a score; understand the reasoning behind answers with our detailed explanations and track your progress.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-neutral-100">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 dark:bg-blue-500">
                     <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.354a15.054 15.054 0 01-4.5 0M3.75 10.5a2.25 2.25 0 002.25 2.25h1.5a2.25 2.25 0 002.25-2.25V8.25a2.25 2.25 0 00-2.25-2.25h-1.5A2.25 2.25 0 003.75 8.25v2.25zM16.5 10.5a2.25 2.25 0 002.25 2.25h1.5a2.25 2.25 0 002.25-2.25V8.25a2.25 2.25 0 00-2.25-2.25h-1.5a2.25 2.25 0 00-2.25 2.25v2.25z" /></svg>
                  </div>
                  Expand Your Mind
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-neutral-400">
                  <p className="flex-auto">Broaden your understanding of psychological principles and apply them to everyday life. Become a little wiser with each question!</p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <div id="about-quiz" className="overflow-hidden bg-white py-16 sm:py-24 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-center">
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400">Our Signature Challenge</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">{quizDetails.title}</p>
                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-neutral-300">
                  {quizDetails.description}
                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none dark:text-neutral-400">
                  {quizDetails.points.map((point, index) => (
                    <div key={index} className="relative pl-9">
                      <dt className="inline font-semibold text-gray-900 dark:text-neutral-100">
                        <svg className="absolute left-1 top-1 h-5 w-5 text-indigo-600 dark:text-indigo-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                        {point.split(':')[0]}:</dt>
                      <dd className="inline"> {point.includes(':') ? point.split(':')[1].trim() : ''}</dd>
                    </div>
                  ))}
                </dl>
                 <div className="mt-10">
                    <Link
                        href="/quiz"
                        className="rounded-md bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
                        Attempt the Quiz
                    </Link>
                </div>
              </div>
            </div>
            <img
              src={quizDetails.imageUrl}
              alt="Descriptive image of the Psychology Quiz"
              className="w-[32rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[40rem] md:-ml-4 lg:-ml-0 dark:ring-gray-100/10"
              width={2432}
              height={1442}
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-16 sm:py-24 dark:bg-zinc-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-lg font-semibold leading-8 tracking-tight text-indigo-600 dark:text-indigo-400">What Our Takers Say</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              People Love Our Psychology Quiz!
            </p>
          </div>
          <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
            <div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
              {testimonials.map((testimonial) => (
                <div key={testimonial.name} className="pt-8 sm:inline-block sm:w-full sm:px-4">
                  <figure className="rounded-2xl bg-white p-8 text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 dark:bg-zinc-900 dark:ring-white/10">
                    <blockquote className="text-gray-900 dark:text-neutral-200">
                      <p>{`“${testimonial.quote}”`}</p>
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-x-4">
                      <img className="h-10 w-10 rounded-full bg-gray-50 dark:bg-zinc-700" src={testimonial.avatarUrl} alt="" />
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-neutral-100">{testimonial.name}</div>
                        <div className="text-gray-600 dark:text-neutral-400">{testimonial.role}</div>
                      </div>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl py-16 px-6 sm:py-24 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Ready to Challenge Your Mind?
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-600 dark:text-neutral-400">
            The ultimate psychology quiz awaits. Discover something new about yourself and the world around you.
          </p>
          <div className="mt-10 flex items-center justify-center">
            <Link
              href="/quiz"
              className="rounded-md bg-indigo-600 px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Start the Quiz Now!
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Page