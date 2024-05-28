import React from 'react'
import {Link} from 'react-router-dom'


const navbar = () => {
  return (
    <>
     <nav className='bg-gray-0 w-full h-20 px-8 md:px-auto border-b-2 border-gray-400'>
        <div className='md:h-16 h-28 mx-auto md:px-4 flex items-end justify-between flex-wrap md:flex-nowrap'>
            <div className='text-green-600 text-2xl mb-3 ml-10 md:order-1 font-bold'>
                <img src="/Logo.jpg" alt="Logo" className='h-8 w-15' />
            </div>
            <div className='text-indigo-700 order-3 w-full md:w-auto md:order-2'>
                <ul className='flex font-semibold justify-between text-2xl'>
                    <li className='md:px-4 md:py-2 text-indigo-700 mx-20'>
                        <Link to="/ParentLogin" className='nav-item'>Log in</Link>
                    </li>
                    <li className='text-indigo-700 border-2 border-indigo-700 rounded-xl px-10 py-2 mx-20'>
                        <Link to="/ParentSignup" className='nav-item'>Sign up</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    </>
  )
}

export default navbar
