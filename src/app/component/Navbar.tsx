import React from 'react'
import Link from 'next/link'
import { auth } from '@/auth';

const Navbar = async() => {
  let session = await auth();
  if(!session){
    session = null;  
  }

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-800">QuizApp</h1>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
              Home
            </Link>
            <Link href="/quiz" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
              Quiz
            </Link>
            {session ? (
              <Link href={`/profile/${session.user.id}`} className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                Profile
              </Link>
            ) : (
              <Link href="/login" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                Login
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <details className="relative">
              <summary className="list-none cursor-pointer p-2">
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span className="block w-5 h-0.5 bg-gray-600 mb-1"></span>
                  <span className="block w-5 h-0.5 bg-gray-600 mb-1"></span>
                  <span className="block w-5 h-0.5 bg-gray-600"></span>
                </div>
              </summary>
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg border">
                <Link href="/" className="block text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 text-sm">
                  Home
                </Link>
              <Link href="/quiz" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                Quiz
              </Link>
              {session ? (
                <Link href={`/profile/${session.user.id}`} className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                  Profile
                </Link>
              ) : (
                <Link href="/login" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                  Login
                </Link>
              )}
              </div>
            </details>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar