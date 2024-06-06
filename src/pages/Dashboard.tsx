import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate, Link } from "react-router-dom";
import ProgressBar from "./progressBar";

const Dashboard = () => {
  const [firstName, setFirstName] = useState("");
  // const [parentID, setParentId] = useState<string | null>(null);
  // const [progress, setProgress] = useState(50)
  const navigate = useNavigate();
  const children = true;

  useEffect(() => {
    const storedFirstName = localStorage.getItem("firstName");
    // const storedParentID = localStorage.getItem("parentID");
    if (storedFirstName !== null) {
      setFirstName(storedFirstName);
    }
    // if (storedParentID !== null) {
    //   setParentId(storedParentID);
    // }
  }, []);

  const handleSignUpClick = () => {
    navigate("/childSignUp");
  };

  return (
    <div className="">
      <div>
      <Sidebar />
      </div>
      <div className="flex justify-center">
      {!children ? (
        <div className="flex-grow"> 
          {/* <div className="ml-[126px] mt-[48px]"> */} <div>
            <p className="text-neutral-black-ish font-bold text-[22px]">
              Hello, {firstName}
            </p>
            <div>
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
                  className="absolute left-4 top-1/2 transform -translate-y-1/2"
                  style={{ width: "20px", height: "20px" }}
                />
                Give Gift
              </button>
            </div>
            <p className="font-bold text-neutral-black-ish text-[28px] mt-[80px]">
              Children Overview
            </p>
            <div className="ml-[207px] w-[928px] mt-[48px] flex flex-col"> 
              <p className="text-center">
                Create a child profile to start saving for goals.
              </p>
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleSignUpClick}
                  className="text-purple-800 border-2 border-purple-700 font-si rounded-xl px-10 py-2 mt-4 relative"
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
          </div>
        </div>
      ) : (
        <div>
        <div className="flex-grow ml-[126px] mt-[48px] gap-[12px]"> 
          <p className="text-neutral-black-ish font-bold text-[22px]">
            Hello, {firstName}
          </p>
          <div>
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
                className="absolute left-4 top-1/2 transform -translate-y-1/2"
                style={{ width: "20px", height: "20px" }}
              />
              Give Gift
            </button>
          </div>
          <p className="font-bold text-neutral-black-ish text-[28px] mt-[80px]">
            Children Overview
          </p>
          <div className="ml-[32px] mt-[24px]">
            <div className="flex items-center pt-[24px] mb-[24px]">
              <img src="/Avatar1.svg" alt="avatar" width="40px" />
              <p className="text-[18px] m-2">Billy</p>
              <Link to="/childProfile" className="ml-[32px] underline">
                View Profile
              </Link>
            </div>
            <div className="flex items-center gap-4 pl-[32px]"> 
              <div className="w-[280px] mt-[24px]">
                <div className="flex items-center gap-[8px] mt-[32px]">
                  <img src="/Wallet.svg" alt="Wallet" />
                  <p className="font-bold text-[18px]">Wallet</p>
                </div>
                <p className="text-neutral-black-ish font-bold text-[44px] pt-[12px]">
                  $100
                </p>
              </div>
              <div className="w-[280px] mt-[24px]">
                <div className="w-[216px]">
                <div className="flex items-center gap-[8px] mt-[32px]">
                  <img src="/Piggy.svg" alt="Wallet" />
                  <p className="font-bold text-[18px]">Goals</p>
                </div>
                <p className="text-neutral-black-ish font-bold text-[44px] pt-[12px]">
                  $100
                </p>
                <p className="text-[14px] text-neutral-black-ish">2 goals</p>
                <ProgressBar progress={40} />
                </div>
              </div>
              <div className="w-[280px] mt-[24px]">
                <div className="w-[216px]">
                <div className="flex items-center gap-[8px] mt-[32px]">
                  <img src="/CircleCheck.svg" alt="Wallet" />
                  <p className="font-bold text-[18px]">Chores</p>
                </div>
                <p className="text-neutral-black-ish font-bold text-[44px] pt-[12px]">
                  $100
                </p>
                <ProgressBar progress={100}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-grow ml-[126px] mt-[48px] gap-[12px]"> 
          
          <div className="ml-[32px] mt-[24px]">
            <div className="flex items-center pt-[24px] mb-[24px]">
              <img src="/Avatar1.svg" alt="avatar" width="40px" />
              <p className="text-[18px] m-2">Timmy</p>
              <Link to="/childProfile" className="ml-[32px] underline">
                View Profile
              </Link>
            </div>
            <div className="flex items-center gap-4 pl-[32px]"> 
              <div className="w-[280px] mt-[24px]">
                <div className="flex items-center gap-[8px] mt-[32px]">
                  <img src="/Wallet.svg" alt="Wallet" />
                  <p className="font-bold text-[18px]">Wallet</p>
                </div>
                <p className="text-neutral-black-ish font-bold text-[44px] pt-[12px]">
                  $70
                </p>
              </div>
              <div className="w-[280px] mt-[24px]">
                <div className="w-[216px]">
                <div className="flex items-center gap-[8px] mt-[32px]">
                  <img src="/Piggy.svg" alt="Wallet" />
                  <p className="font-bold text-[18px]">Goals</p>
                </div>
                <p className="text-neutral-black-ish font-bold text-[44px] pt-[12px]">
                  $100
                </p>
                <p className="text-[14px] text-neutral-black-ish">2 goals</p>
                <ProgressBar progress={30} />
                </div>
              </div>
              <div className="w-[280px] mt-[24px]">
                <div className="w-[216px]">
                <div className="flex items-center gap-[8px] mt-[32px]">
                  <img src="/CircleCheck.svg" alt="Wallet" />
                  <p className="font-bold text-[18px]">Chores</p>
                </div>
                <p className="text-neutral-black-ish font-bold text-[44px] pt-[12px]">
                  1/6
                </p>
                <ProgressBar progress={16}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
    </div>
  );
  
};

export default Dashboard;
