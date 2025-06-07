import React from 'react'

const Footer = () => {
  return (
    <div className="bg-white text-black p-4 mt-auto">
        <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <p>&copy; 2023 Your Company. All rights reserved.</p>
                </div>
                <div className="flex space-x-4">
                    <a href="#" className="hover:text-gray-300">About</a>
                    <a href="#" className="hover:text-gray-300">Contact</a>
                    <a href="s#" className="hover:text-gray-300">Privacy Policy</a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer