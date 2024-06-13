import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className='bg-gray-0 w-full h-20 px-8 md:px-auto border-b-2 border-gray-400'>
      <div className='md:h-16 h-28 mx-auto md:px-4 flex items-center justify-between flex-wrap'>
        <div className='text-green-600 text-2xl mb-3 md:mb-0 font-bold'>
          <img src="/Logo.jpg" alt="Logo" className='h-8 w-15' />
        </div>
        <div className='md:hidden'>
          <button className='text-purple-800 focus:outline-none' onClick={toggleMenu}>
            <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16' />
            </svg>
          </button>
          {isMenuOpen && (
            <div className='absolute top-20 left-0 w-full bg-white border border-gray-400 py-2 px-4'>
              <ul className='flex flex-col'>
                <li className='text-purple-800 border-b border-gray-400 py-2'>
                  <Link to="/Login" className='nav-item' onClick={toggleMenu}>Log in</Link>
                </li>
                <li className='text-purple-800 py-2'>
                  <Link to="/ParentSignup" className='nav-item' onClick={toggleMenu}>Sign up</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className='hidden md:block w-full md:w-auto md:order-2'>
          <ul className='flex font-semibold justify-between text-2xl pt-3'>
            <li className='md:px-4 md:py-2 text-purple-800 mx-2 md:mx-4'>
              <Link to="/Login" className='nav-item'>Log in</Link>
            </li>
            <li className='text-purple-800 border-2 border-purple-800 rounded-xl px-4 py-2 mx-2 md:mx-4'>
              <Link to="/ParentSignup" className='nav-item'>Sign up</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


