import React from 'react'
import { useSelector } from 'react-redux'
import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'
const Header = () => {
  const {currentUser}=useSelector(state=>state.user)

  return (
   <header className='bg-slate-200 shadow-md'>
    <div className='flex  justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to="/">
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
        <span className='text-red-800'>Marketing</span>
        <span className=''>Management</span>
        </h1>
        </Link>
        <from className="bg-slate-100 rounded-lg p-3 flex items-center" >
            <input type="text" placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64'/>
            <FaSearch/>
        </from>
        <ul className='flex gap-4 font-bold cursor-pointer '>
            <Link to="/">
            <li className='hidden sm:inline hover:underline hover:text-red-800'>Home</li>
            </Link>

            <Link to="/about">
            <li className='hidden sm:inline hover:underline hover:text-red-800'>About</li>
            </Link>

            <Link to='/profile'>
            {currentUser ? 
              <img
                className='rounded-full h-7 w-7 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
             : 
              <li className=' text-slate-700 hover:underline'> Sign in</li>
            }
          </Link>
       
        </ul>
    </div>
    </header>
  )
}

export default Header
