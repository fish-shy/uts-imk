
import { auth } from '@/auth';
import Link from 'next/link';
import React from 'react';
import { Brain, Star, Users, Award, ArrowRight, CheckCircle, Zap, BookOpen } from 'lucide-react';
import { InteractiveBackground } from '../component/home/InteractiveBackground';
import { AnimatedSection } from '../component/home/AnimatedSection';


const Page = async () => {
  const testimonials = [
    {
      quote: "This psychology quiz was incredibly insightful! I learned so much about myself in a really engaging way.",
      name: 'Jamie L.',
      role: 'Curious Learner',
      rating: 5,
    },
    {
      quote: "A fantastic way to challenge my understanding of psychological concepts. The questions were thought-provoking and well-crafted.",
      name: 'Chris B.',
      role: 'Psychology Enthusiast', 
      rating: 5,
    },
    {
      quote: 'I loved tracking my score and seeing the detailed explanations. It really helped solidify my knowledge!',
      name: 'Pat N.',
      role: 'Student',
      rating: 5,
    },
  ];

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Expertly Crafted Questions",
      description: "Dive into diverse psychological topics with questions designed by professionals",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Feedback", 
      description: "Get immediate explanations and learn from every answer you give",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Track Your Progress",
      description: "Monitor your scores and challenge yourself to reach new heights",
      color: "from-green-500 to-emerald-500"
    }
  ];

  //random stats
  const stats = [
    { number: "20b+", label: "Quiz Takers" },
    { number: "10", label: "Average Rating" },
    { number: "20", label: "Questions" },
    { number: "100%", label: "Completion Rate" }
  ];

  const checklistItems = [
    "50+ carefully crafted questions covering diverse topics",
    "Immediate feedback with detailed explanations",
    "Personalized insights based on your responses",
    "Progress tracking and achievement badges"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      <InteractiveBackground />

      <section className="relative min-h-screen flex items-center justify-center px-6">
        <AnimatedSection className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 text-white/80 mb-6">
              <Brain className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-medium">Unlock Your Mind's Potential</span>
            </div>
          </div>
          
          <h1 className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-200 leading-tight mb-6">
            Discover Your
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Inner Psychologist
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed">
            Embark on a fascinating journey through the human mind. Our interactive psychology quiz reveals 
            hidden insights about yourself while challenging your understanding of mental processes.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link
              href="/quiz"
              className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 inline-flex items-center gap-2"
            >
              <span className="relative z-10 flex items-center gap-2">
                Take the Quiz Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            
            <div className="flex items-center gap-4 text-white/60">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 border-2 border-white/20" />
                ))}
              </div>
              <span className="text-sm">Join 15,000+ quiz takers</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white/60 text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Why You'll <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Love</span> This Quiz
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Our Psychology Quiz isn't just about right or wrong answers—it's about unlocking your understanding of the human mind through an immersive, personalized experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 group-hover:transform group-hover:scale-105">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-6 group-hover:rotate-12 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-white/70 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-full px-6 py-3 text-purple-300 mb-6">
                <BookOpen className="w-5 h-5" />
                <span className="text-sm font-medium">Our Signature Challenge</span>
              </div>
              
              <h3 className="text-5xl font-bold text-white mb-6">
                The Ultimate Psychology Challenge
              </h3>
              
              <p className="text-xl text-white/70 mb-8 leading-relaxed">
                Dive deep into the fascinating world of psychology with our comprehensive quiz. Test your understanding of core concepts, famous experiments, and influential theories through an engaging, interactive experience.
              </p>

              <div className="space-y-4 mb-10">
                {checklistItems.map((point, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <span className="text-white/80">{point}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/quiz"
                className="group bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25 inline-flex items-center gap-2"
              >
                <span className="flex items-center gap-2">
                  Attempt the Quiz
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-3xl blur-3xl transform rotate-6" />
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                  <div className="aspect-video bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl flex items-center justify-center">
                    <Brain className="w-20 h-20 text-white/60" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-md rounded-full px-6 py-3 text-blue-300 mb-6">
              <Users className="w-5 h-5" />
              <span className="text-sm font-medium">What Our Takers Say</span>
            </div>
            
            <h2 className="text-5xl font-bold text-white mb-6">
              People <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Love</span> Our Psychology Quiz!
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 group-hover:transform group-hover:scale-105">
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-white/80 italic mb-6 leading-relaxed">"{testimonial.quote}"</p>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-white">{testimonial.name}</div>
                      <div className="text-white/60 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl font-bold text-white mb-6">
            Ready to Challenge Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Mind?</span>
          </h2>
          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
            Discover something new about yourself and the world around you. Join thousands who have already unlocked their psychological insights.
          </p>
          
          <Link
            href="/quiz"
            className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 inline-flex items-center gap-3"
          >
            <span className="relative z-10 flex items-center gap-3">
              Start the Quiz Now
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Page;