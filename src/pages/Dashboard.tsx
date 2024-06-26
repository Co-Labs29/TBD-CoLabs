import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
// import ProgressBar from "./progressBar";
import config from "../config/config";
import SingleChildDashboard from "../components/SingleChildDashboard";

import { ChildInfo } from "types/types";

const Dashboard = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [childrenInfo, setChildrenInfo] = useState<ChildInfo[]>([])
  const navigate = useNavigate();
  const url = config.backendURL;

  const fetchParentInfo = async () => {
    try {
      const response = await fetch(
        `${url}/parent_info/${sessionStorage.getItem("parentID")}`
      );
      const data = await response.json();
      setFirstName(data.parent.first_name);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchChildrenInfo = async () => {
    try {
        const response = await fetch(`${url}/info`, {
          headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        })
        const data = await response.json()
        setChildrenInfo(data)
    } catch (error) {
        console.error(error);
        
    }
  }
 


  useEffect(() => {
    fetchParentInfo();
    fetchChildrenInfo()
  }, []);

  const handleSignUpClick = () => {
    navigate("/childSignUp");
  };



  return (
    <div className="h-screen flex lg:flex-row">
      <Sidebar />
      <div className="flex flex-col flex-grow relative mt-4 lg:ml-64">
        <div className="flex justify-center">
          {!Array.isArray(childrenInfo) ? (
            <div className="flex-grow flex flex-col pt-[72px] text-center lg:text-start">
              <p className="text-neutral-black-ish font-bold text-2xl">
                Hello, {firstName}
              </p>
              <div className="mt-4 flex flex-col lg:flex-row gap-4 mx-2">
                <button
                  type="button"
                  onClick={handleSignUpClick}
                  className="flex items-center justify-center text-purple-800 border-2 border-purple-700 font-semibold rounded-xl px-10 py-2 mt-4 relative"
                >
                  <img
                    src="/Plus.svg"
                    alt="Plus sign"
                    className="mr-2" 
                    style={{ width: "20px", height: "20px" }}
                  />
                  Add Child
                </button>
                <button
                  type="button"
                  onClick={() => {}}
                  className="flex items-center justify-center text-purple-800 border-2 border-purple-700 rounded-xl px-10 font-semibold py-2 lg:mt-4 relative"
                >
                  <img
                    src="/Gift.svg"
                    alt="Gift sign"
                    className="mr-2" 
                    style={{ width: "20px", height: "20px" }}
                  />
                  Give Gift
                </button>
              </div>

              <p className="font-bold text-neutral-black-ish text-2xl mt-10">
                Children Overview
              </p>

              <div className="max-w-[928px] lg:pt-[56px] lg:px-[207px] lg:pb-[135px] pt-6 px-8 pb-[114px] border border-border-gray rounded-[16px] text-center mx-3 xl:mx-0">
                <p className=" overflow-hidden text-ellipsis ">
                  Create a child profile to start saving for goals.
                </p>
                <button
                  type="button"
                  onClick={handleSignUpClick}
                  className="text-purple-800 border-2 border-purple-700 font-semibold rounded-xl px-10 py-2 mt-4 relative"
                >
                  <img
                    src="/Plus.svg"
                    alt="Plus sign"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2"
                    style={{ width: "20px", height: "20px" }}
                  />
                  Add Child
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-grow">
              
                <p className="text-neutral-black-ish font-bold text-2xl mt-[72px] text-center xl:mt-4 xl:text-start">
                  Hello, {firstName}
                </p>
                <div className="mt-4 flex flex-col lg:flex-row gap-4 mx-2 xl:mx-0">
                  <button
                    type="button"
                    onClick={handleSignUpClick}
                    className="flex items-center justify-center text-purple-800 border-2 border-purple-700 font-semibold rounded-xl px-10 py-2 mt-4 relative"
                  >
                    <img
                      src="/Plus.svg"
                      alt="Plus sign"
                      className="mr-2" 
                      style={{ width: "20px", height: "20px" }}
                    />
                    Add Child
                  </button>
                  <button
                    type="button"
                    onClick={() => {}}
                    className="flex items-center justify-center text-purple-800 border-2 border-purple-700 rounded-xl px-10 font-semibold py-2 lg:mt-4 relative"
                  >
                    <img
                      src="/Gift.svg"
                      alt="Gift sign"
                      className="mr-2" 
                      style={{ width: "20px", height: "20px" }}
                    />
                    Give Gift
                  </button>
                </div>
              <p className="font-bold text-neutral-black-ish text-3xl mt-[80px] ml-8 xl:ml-0">
                Children Overview
              </p>
              <div className="mt-6 mx-8">
                {childrenInfo.map((child) => (
                  <SingleChildDashboard key={child.child_id} child={child}/>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
