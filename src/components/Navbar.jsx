import React from 'react'
import logo from '../assets/logo.png'
const Navbar = () => {
  return (
    <nav className='bg-black flex justify-around h-14 py-3.5'>
     <div className='flex items-center space-x-3'> 
      <span className="font-bold text-2xl text-white">  <div className="flex">
          <h1 className="">Pass</h1>
          <h1 className=" text-green-700">Ward</h1>
        </div> </span> 
     </div>
   <button className='flex justify-center  cursor-pointer text-black font-bold rounded-xl gap-2 px-2 py-1 bg-green-600'>
    <img className="invert" src="icons/github.svg" alt="gitlogo"  />
    <span>GitHub</span>
   </button>
    </nav>
  )
}

export default Navbar
