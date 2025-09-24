import React from 'react'
import logo from '../assets/logo.png'
const Navbar = () => {
  return (
    <nav className='bg-neutral-900 flex justify-around h-14 py-3.5'>
     <div className='flex items-center space-x-3'> 
      <span className="font-bold text-2xl text-white"> PassWard </span> 
     </div>
      <ul>
        <li>
            <a className='py-10 px-4 text-white text-xl' href="http://">Home</a>
            <a className='py-10 px-4 text-white text-xl' href="http://">About</a>
            <a className='py-10 px-4 text-white text-xl' href="http://">Contact</a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
