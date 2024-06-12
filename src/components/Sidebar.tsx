import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState<string>(location.pathname);
  const [role, setRole] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setActiveLink(location.pathname);
    const userRole = sessionStorage.getItem("role");
    setRole(userRole || "");
  }, [location.pathname]);

  const handleLinkClick = (path: string) => {
    setActiveLink(path);
    setIsOpen(false);
  };

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear session and local storage
    sessionStorage.clear();
    localStorage.clear();
    // Redirect to the login page or any appropriate page
    navigate("/");
  };

  return (
    <>
      <div className="md:hidden fixed top-0 right-0 left-0 flex justify-between items-center bg-white shadow-lg p-4 z-50">
        <img src="/Logo.jpg" alt="logo" width={"100px"} />
        <button onClick={toggleDrawer} className="p-2 rounded-md">
          <img src="/icons8-menu.svg" alt="Menu" className="w-6 h-6" />
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40 transition-opacity"
          onClick={toggleDrawer}
        ></div>
      )}

      <aside
        className={`fixed inset-y-0 ${
          isOpen ? "left-0" : "-left-full"
        } md:left-0 md:relative transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform z-50 md:z-auto bg-white ${
          isOpen ? "w-full" : "w-64"
        } md:w-64 h-full border-r-2 flex flex-col items-center justify-between font-semibold`}
      >
        {isOpen && (
          <button
            className="md:hidden absolute top-4 right-4 p-2 rounded-md"
            onClick={toggleDrawer}
          >
            <img src="/close-svgrepo-com.svg" alt="Close" className="w-6 h-6" />
          </button>
        )}
        <div className="mt-5">
          <div className="text-2xl font-bold ml-2">
            <img src="/Logo.jpg" alt="Logo" className="h-5 w-13" />
          </div>
          {role === "child" && (
            <>
              <div className="h-10 w-full mt-14">
                <Link
                  to="/childProfile"
                  className={
                    activeLink === "/childProfile"
                      ? "flex items-center bg-[#ECEBFA] text-purple-800 border font-bold border-purple-700 rounded-lg p-2 w-full"
                      : "flex items-center p-2 w-full"
                  }
                  onClick={() => handleLinkClick("/childProfile")}
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
                    activeLink === "/chores"
                      ? "flex items-center bg-[#ECEBFA] text-purple-800 border font-bold border-purple-700 rounded-lg p-2 w-full"
                      : "flex items-center p-2 w-full"
                  }
                  onClick={() => handleLinkClick("/chores")}
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
                <button
                  className="flex items-center p-2 w-full"
                  onClick={handleLogout}
                >
                  <img
                    className="w-7 h-7 mr-2"
                    src="/logout.svg"
                    alt="logout Icon"
                  />
                  Log out
                </button>
              </div>
            </>
          )}
          {role === "parent" && (
            <>
              <div className="h-10 w-full mt-14">
                <Link
                  to="/dashboard"
                  className={
                    activeLink === "/dashboard"
                      ? "flex items-center bg-[#ECEBFA] text-purple-800 border font-bold border-purple-700 rounded-lg p-2 w-full"
                      : "flex items-center p-2 w-full"
                  }
                  onClick={() => handleLinkClick("/dashboard")}
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
                    activeLink === "/childProfile"
                      ? "flex items-center bg-[#ECEBFA] text-purple-800 border font-bold border-purple-700 rounded-lg p-2 w-full"
                      : "flex items-center p-2 w-full"
                  }
                  onClick={() => handleLinkClick("/childProfile")}
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
                    activeLink === "/chores"
                      ? "flex items-center bg-[#ECEBFA] text-purple-800 border font-bold border-purple-700 rounded-lg p-2 w-full"
                      : "flex items-center p-2 w-full"
                  }
                  onClick={() => handleLinkClick("/chores")}
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
                    activeLink === "/notifications"
                      ? "flex items-center bg-[#ECEBFA] text-purple-800 border font-bold border-purple-700 rounded-lg p-2 w-full"
                      : "flex items-center p-2 w-full"
                  }
                  onClick={() => handleLinkClick("/Notifications")}
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
                <button
                  className="flex items-center p-2 w-full"
                  onClick={handleLogout}
                >
                  <img
                    className="w-7 h-7 mr-2"
                    src="/logout.svg"
                    alt="logout Icon"
                  />
                  Log out
                </button>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
