import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState<string>(location.pathname);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const handleLinkClick = (path: string) => {
    setActiveLink(path);
  };

  const linkClasses = (path: string) => (
    path === activeLink
      ? "flex items-center bg-[#ECEBFA] text-purple-800 border font-bold border-purple-700 rounded-lg p-2 w-full"
      : "flex items-center p-2 w-full"
  );

  return (
    <>
      <div className="flex">
        <aside className="w-40 h-full flex flex-col items-center justify-between fixed top-0 left-0 border-r-2 border-gray-300 font-semibold">
          <div className="mt-5">
            <div className='text-2xl md:order-1 font-bold ml-2'>
              <img src="/Logo.jpg" alt="Logo" className='h-5 w-13' />
            </div>
            <div className='h-10 w-full mt-14'>
              <Link 
                to='/dashboard'
                className={linkClasses('/dashboard')}
                onClick={() => handleLinkClick('/dashboard')}
              >
                <img className='w-7 h-7 mr-2' src="/Dashboard.jpg" alt="dashboard Icon" />
                Dashboard
              </Link>
            </div>
            <div className='h-10 w-full mt-7'>
              <Link 
                to='/child-profile' 
                className={linkClasses('/child-profile')}
                onClick={() => handleLinkClick('/child-profile')}
              >
                <img className='w-7 h-7 mr-2' src="/Star.jpg" alt="child profile Icon" />
                Child Profile
              </Link>
            </div>
            <div className='h-10 w-full mt-7'>
              <Link 
                to='/chores' 
                className={linkClasses('/chores')}
                onClick={() => handleLinkClick('/chores')}
              >
                <img className='w-7 h-7 mr-2' src="/CircleCheck.jpg" alt="chores Icon" />
                Chores
              </Link>
            </div>
            <div className='h-10 w-full mt-7'>
              <Link 
                to='/notifications' 
                className={linkClasses('/notifications')}
                onClick={() => handleLinkClick('/notifications')}
              >
                <img className='w-7 h-7 mr-2' src="/Bell.jpg" alt="notifications Icon" />
                Notifications
              </Link>
            </div>
            <div className='h-10 w-full mt-7'>
              <Link 
                to='/settings' 
                className={linkClasses('/settings')}
                onClick={() => handleLinkClick('/settings')}
              >
                <img className='w-7 h-7 mr-2' src="/Settings.jpg" alt="settings Icon" />
                Settings
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}

export default Sidebar




