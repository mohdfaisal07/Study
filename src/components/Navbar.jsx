import React from 'react'
import logo from '../assets/logo.png'

const Navbar = () => {
  return (
    <nav className="bg-black px-4 py-2.5 sm:px-6">
      <div className="flex justify-around items-center">
        {/* Logo / Brand */}
        <div className="flex items-center space-x-2">
          <span className="font-bold text-xl sm:text-2xl text-white flex">
            <h1>Pass</h1>
            <h1 className="text-green-700">Ward</h1>
          </span>
        </div>

        {/* Right Button */}
        <button className="flex items-center gap-2 px-2 py-1 text-sm sm:text-base font-bold text-black bg-green-600 rounded-xl hover:bg-green-700 transition cursor-pointer">
          <img className="invert w-4 h-4 sm:w-5 sm:h-5" src="icons/github.svg" alt="gitlogo" />
          <span>GitHub</span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
