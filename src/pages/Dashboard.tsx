import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate, Link } from "react-router-dom";
import ProgressBar from "./progressBar";

const Dashboard = () => {
  const [firstName, setFirstName] = useState("");
  const navigate = useNavigate();
  const children = true;

  useEffect(() => {
    const storedFirstName = localStorage.getItem("firstName");
    if (storedFirstName !== null) {
      setFirstName(storedFirstName);
    }
  }, []);

  const handleSignUpClick = () => {
    navigate("/childSignUp");
  };

  return (
    <div className="h-screen flex lg:flex-row">
      <Sidebar />
      <div className="flex flex-col flex-grow p-4 lg:ml-64">
        <div className="flex justify-center">
          {!children ? (
            <div className="flex-grow flex flex-col items-center">
              <p className="text-neutral-black-ish font-bold text-2xl">
                Hello, {firstName}
              </p>
              <div className="mt-4">
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
                <button
                  type="button"
                  onClick={() => {}}
                  className="text-purple-800 border-2 border-purple-700 rounded-xl px-10 font-semibold py-2 mt-4 relative"
                >
                  <img
                    src="/Gift.svg"
                    alt="Gift sign"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2"
                    style={{ width: "20px", height: "20px" }}
                  />
                  Give Gift
                </button>
              </div>
              <p className="font-bold text-neutral-black-ish text-2xl mt-10">
                Children Overview
              </p>
              <div className="mt-4 w-full max-w-xl text-center">
                <p>Create a child profile to start saving for goals.</p>
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
              <div className="flex flex-col items-center md:items-start md:flex-row md:gap-4 mt-6">
                <p className="text-neutral-black-ish font-bold text-2xl">
                  Hello, {firstName}
                </p>
                <div className="mt-4">
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
                  <button
                    type="button"
                    onClick={() => {}}
                    className="text-purple-800 border-2 border-purple-700 rounded-xl px-10 font-semibold py-2 mt-4 relative"
                  >
                    <img
                      src="/Gift.svg"
                      alt="Gift sign"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2"
                      style={{ width: "20px", height: "20px" }}
                    />
                    Give Gift
                  </button>
                </div>
              </div>
              <p className="font-bold text-neutral-black-ish text-3xl mt-10">
                Children Overview
              </p>
              <div className="mt-6">
                {[
                  {
                    name: "Billy",
                    wallet: 80,
                    goals: 2,
                    goalsAmount: 10,
                    chores: 100,
                    choresCount: "100",
                  },
                  {
                    name: "Timmy",
                    wallet: 70,
                    goals: 50,
                    goalsAmount: 100,
                    chores: 50,
                    choresCount: "1/6",
                  },
                ].map((child) => (
                  <div
                    key={child.name}
                    className="flex flex-col xl:items-start gap-4 mt-6"
                  >
                    <div className="flex items-center w-full xl:w-auto">
                      <img
                        src="/Avatar1.svg"
                        alt="avatar"
                        className="w-10 h-10"
                      />
                      <p className="text-lg xl:ml-2">{child.name}</p>
                      <Link to="/childProfile" className="xl:ml-4 underline">
                        View Profile
                      </Link>
                    </div>
                    <div className="flex flex-col xl:flex-row xl:items-start gap-4 pl-8">
  <div className="xl:w-60 mt-4 xl:mt-0 flex flex-col items-start">
    <div className="flex gap-2">
      <img src="/Wallet.svg" alt="Wallet" />
      <p className="font-bold text-lg">Wallet</p>
    </div>
    <p className="text-neutral-black-ish font-bold text-4xl pt-3">
      ${child.wallet}
    </p>
  </div>

  <div className="w-full md:w-60 md:mt-0 flex flex-col items-start">
    <div>
      <div className="flex items-center gap-2">
        <img src="/Piggy.svg" alt="Piggy Bank" />
        <p className="font-bold text-lg">Goals</p>
      </div>
      <p className="text-neutral-black-ish font-bold text-4xl pt-3">
        ${child.goalsAmount}
      </p>
    </div>
    <div>
      <p className="text-sm text-neutral-black-ish">
        {child.goals} goals
      </p>
    </div>
    <div className="mt-2 w-full">
      <ProgressBar progress={child.goals} />
    </div>
  </div>

  <div className="w-full md:w-60 mt-4 xl:mt-0 flex flex-col items-start">
    <div className="flex items-center gap-2">
      <img src="/CircleCheck.svg" alt="Chores" />
      <p className="font-bold text-lg">Chores</p>
    </div>
    <p className="text-neutral-black-ish font-bold text-4xl pt-3">
      {child.choresCount}
    </p>
    <div className="mt-7 w-full">
      <ProgressBar progress={child.chores} />
    </div>
  </div>
</div>

                  </div>
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
