import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState<string>(location.pathname);
  const [role, setRole] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setActiveLink(location.pathname);
    const userRole = sessionStorage.getItem('role');
    setRole(userRole || '');
  }, [location.pathname]);

  const handleLinkClick = (path: string) => {
    setActiveLink(path);
    setIsOpen(false);
  };

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="custom-1316:hidden">
        <button onClick={toggleDrawer} className="p-2 bg-gray-300 rounded-md">
          <img src="/icons8-menu.svg" alt="Menu" className="w-6 h-6" />
        </button>
      </div>

    
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-40 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleDrawer}
      ></div>

     
      <aside
        className={`h-screen inset-y-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform custom-1316:translate-x-0 z-50 custom-1316:z-auto bg-white w-64 custom-1316:w-64 h-full border-r-2 border-gray-300 flex flex-col items-center justify-between font-semibold`}
      >
        <div className="mt-5">
          <div className="text-2xl font-bold ml-2">
            <img src="/Logo.jpg" alt="Logo" className="h-5 w-13" />
          </div>
          {role === 'child' && (
            <>
              <div className="h-10 w-full mt-14">
                <Link
                  to="/childProfile"
                  className={
                    activeLink === '/childProfile'
                      ? 'flex items-center bg-[#ECEBFA] text-purple-800 border font-bold border-purple-700 rounded-lg p-2 w-full'
                      : 'flex items-center p-2 w-full'
                  }
                  onClick={() => handleLinkClick('/childProfile')}
                >
                  <img
                    className="w-7 h-7 mr-2"
                    src="/Star.jpg"
                    alt="child profile Icon"
                  />
                  Child Profile
                </Link>
              </div>
              <div className="h-10 w-full mt-7">
                <Link
                  to="/chores"
                  className={
                    activeLink === '/chores'
                      ? 'flex items-center bg-[#ECEBFA] text-purple-800 border font-bold border-purple-700 rounded-lg p-2 w-full'
                      : 'flex items-center p-2 w-full'
                  }
                  onClick={() => handleLinkClick('/chores')}
                >
                  <img
                    className="w-7 h-7 mr-2"
                    src="/CircleCheck.jpg"
                    alt="chores Icon"
                  />
                  Chores
                </Link>
              </div>
            </>
          )}
          {role === 'parent' && (
            <>
              <div className="h-10 w-full mt-14">
                <Link
                  to="/dashboard"
                  className={
                    activeLink === '/dashboard'
                      ? 'flex items-center bg-[#ECEBFA] text-purple-800 border font-bold border-purple-700 rounded-lg p-2 w-full'
                      : 'flex items-center p-2 w-full'
                  }
                  onClick={() => handleLinkClick('/dashboard')}
                >
                  <img
                    className="w-7 h-7 mr-2"
                    src="/Dashboard.jpg"
                    alt="dashboard Icon"
                  />
                  Dashboard
                </Link>
              </div>
              <div className="h-10 w-full mt-7">
                <Link
                  to="/childProfile"
                  className={
                    activeLink === '/childProfile'
                      ? 'flex items-center bg-[#ECEBFA] text-purple-800 border font-bold border-purple-700 rounded-lg p-2 w-full'
                      : 'flex items-center p-2 w-full'
                  }
                  onClick={() => handleLinkClick('/childProfile')}
                >
                  <img
                    className="w-7 h-7 mr-2"
                    src="/Star.jpg"
                    alt="child profile Icon"
                  />
                  Child Profile
                </Link>
              </div>
              <div className="h-10 w-full mt-7">
                <Link
                  to="/chores"
                  className={
                    activeLink === '/chores'
                      ? 'flex items-center bg-[#ECEBFA] text-purple-800 border font-bold border-purple-700 rounded-lg p-2 w-full'
                      : 'flex items-center p-2 w-full'
                  }
                  onClick={() => handleLinkClick('/chores')}
                >
                  <img
                    className="w-7 h-7 mr-2"
                    src="/CircleCheck.jpg"
                    alt="chores Icon"
                  />
                  Chores
                </Link>
              </div>
              <div className="h-10 w-full mt-7">
                <Link
                  to="/notifications"
                  className={
                    activeLink === '/notifications'
                      ? 'flex items-center bg-[#ECEBFA] text-purple-800 border font-bold border-purple-700 rounded-lg p-2 w-full'
                      : 'flex items-center p-2 w-full'
                  }
                  onClick={() => handleLinkClick('/notifications')}
                >
                  <img
                    className="w-7 h-7 mr-2"
                    src="/Bell.jpg"
                    alt="notifications Icon"
                  />
                  Notifications
                </Link>
              </div>
              <div className="h-10 w-full mt-7">
                <Link
                  to="/settings"
                  className={
                    activeLink === '/settings'
                      ? 'flex items-center bg-[#ECEBFA] text-purple-800 border font-bold border-purple-700 rounded-lg p-2 w-full'
                      : 'flex items-center p-2 w-full'
                  }
                  onClick={() => handleLinkClick('/settings')}
                >
                  <img
                    className="w-7 h-7 mr-2"
                    src="/Settings.jpg"
                    alt="settings Icon"
                  />
                  Settings
                </Link>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;







