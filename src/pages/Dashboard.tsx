import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ChildSignUp from "../components/ChildSignUp/ChildSignUp";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [firstName, setFirstName] = useState("");
  const [parentID, setParentId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFirstName = localStorage.getItem("firstName");
    const storedParentID = localStorage.getItem("parentID");
    if (storedFirstName !== null) {
      setFirstName(storedFirstName);
    }
    if (storedParentID !== null) {
      setParentId(storedParentID);
    }
  }, []);

  const handleSignUpClick = () => {
    navigate("/childSignUp");
  };

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="ml-80 mt-5 p-4 w-full">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-2xl">Hello, {firstName}</h1>
            <p className="font-bold text-2xl mr-10">
              Your parent ID: {parentID}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-row">
  <div>
    <div className="flex justify-between ml-80">
      <button
        type="button"
        onClick={handleSignUpClick}
        className="text-purple-800 border-2 border-purple-700 font-si rounded-xl px-10 py-2 mt-4 relative ml-auto mr-4"
      >
        <img
          src="/Plus.svg"
          alt="Plus sign"
          className="absolute left-4 top-1/2 transform -translate-y-1/2"
          style={{ width: "20px", height: "20px" }}
        />
        Add Child
      </button>
      <button
        type="button"
        onClick={() => {}}
        className="text-purple-800 border-2 border-purple-700 rounded-xl px-10 font-semibold py-2 mt-4 relative ml-auto mr-4"
      >
        <img
          src="/Gift.svg"
          alt="Plus sign"
          className="absolute left-4 top-1/2 transform  -translate-y-1/2"
          style={{ width: "20px", height: "20px" }}
        />
        Give Gift
      </button>
    </div>
  </div>
</div>
    </>
  );
  
};

export default Dashboard;