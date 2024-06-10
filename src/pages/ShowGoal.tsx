import { useState, useEffect } from "react";
import config from "../config/config";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";

const ShowGoals = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState<number>(0);
  const url = config.backendURL;
  const id = sessionStorage.getItem("goalId");
  const token = localStorage.getItem("token");
  const childId = sessionStorage.getItem("selectedChildId");
  //   const navigate = useNavigate();

  const getGoal = async () => {
    try {
      const response = await fetch(`${url}/goals/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch goal");
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching goal:", error);
    }
  };

  useEffect(() => {
    getGoal();
  }, [id, token, url]);

  const handleAddMoneyClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleMoneyTransfer = async () => {
    try {
      const goalId = sessionStorage.getItem("goalId");
      if (!goalId) {
        throw new Error("Goal ID is missing");
      }

      const parsedGoalId = parseInt(goalId, 10);
      if (isNaN(parsedGoalId)) {
        throw new Error("Goal ID is invalid");
      }

      if (isNaN(amount) || amount <= 0) {
        throw new Error("Amount is invalid");
      }

      console.log("Goal ID:", parsedGoalId);
      console.log("Amount:", amount);

      const response = await fetch(`${url}/transfer/${childId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paid: amount, goal_id: parsedGoalId }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Could not transfer the money");
      }

      setShowModal(false);

      getGoal();
    } catch (error) {
      console.error("Error transferring money:", error);
      let errorMessage = "An unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        if (typeof error === "object" && error !== null && "message" in error) {
          errorMessage = (error as { message: string }).message;
        } else {
          errorMessage = String(error);
        }
      }
      alert(`Error: ${errorMessage}`);
    }
  };
  const navigate = useNavigate()
  const deleteGoal = () => {
    const fetchDelete = async () => {
      const response = await fetch(
        `${url}/delete_goal/${sessionStorage.getItem("goalId")}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "application/json",
          },
        }
      );
      const jsonData = await response.json();
      navigate('/ChildProfile') 
      return `Goal is deleted ${jsonData}`;
    };
    fetchDelete();
  };

  return (
    <>
      <div className="h-screen flex">
        <Sidebar />
        <div className="flex items-center pt-20 xl:ml-[20%]">
          {data.map((goal: any, index: number) => (
            <div
              key={index}
              className="border border-gray-200 w-[600px] h-[700px] p-4 flex flex-col items-center bg-[#ECFAEB]">
                <div className="flex w-full justify-evenly ml-32">
              <h3 className="text-3xl font-semibold m-5 mb-10 flex">{goal.name}</h3>
              <div className="w-[20px] h-[20px] mt-7 flex">
                <img src="/icons8-trash.svg" alt="Bin" 
                className="cursor-pointer"
                onClick={deleteGoal}
                />
              </div>
                </div>
              <span className="text-7xl pt-8 lg:pt-10 w-[300px] h-[150px] bg-white flex justify-center">
                {goal.img}
              </span>
              <div className="flex flex-col font-bold pt-12 ml-3">
                <div className="flex items-center">
                  <div className="flex text-3xl pb-4 pr-5">${goal.amount}</div>
                  <div className="ml-4 flex">
                    <button
                      type="button"
                      className="text-purple-800 border-2 border-purple-700 px-8 py-2 mt-4 relative ml-2 m-9 rounded-md"
                      onClick={handleAddMoneyClick}
                    >
                      <img
                        src="/Plus.svg"
                        alt="Plus sign"
                        className="absolute left-2 top-1/2 transform -translate-y-1/2"
                        style={{ width: "20px", height: "20px" }}
                      />
                      Add Money
                    </button>
                  </div>
                </div>
                <div className="flex mt-2">
                  <div className="bg-gray-200 h-4 rounded-xl mr-5 flex-grow relative ml-1">
                    <div
                      className="h-full bg-green-400 rounded-xl absolute"
                      style={{
                        width: `${
                          (parseInt(goal.paid) / parseInt(goal.amount)) * 100
                        }%`,
                      }}
                    ></div>
                    <p className="font-semibold pt-6">
                      ${goal.paid}/{goal.amount}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-lg font-semibold pt-12">Description</p>
                  <p className="pt-2 font-normal">{goal.description}</p>
                  <p className="pt-5">Link</p>
                  <p className="pt-3 font-normal">{goal.link}</p>
                </div>
              </div>
            </div>
          ))}
          {showModal && (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-4 rounded-md w-[450px] h-[340px] relative">
                <button
                  type="button"
                  className="text-gray-900 hover:text-gray-500 font-semibold absolute right-16 top-12 text-2xl "
                  onClick={handleCloseModal}
                >
                  X
                </button>
                <h2 className="text-2xl ml-3 font-semibold mb-4 mt-[33%]">
                  How much do you want to add?
                </h2>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(parseInt(e.target.value, 10))}
                  className="border border-gray-300 rounded-md px-3 py-2 w-[90%] ml-3"
                />
                <button
                  type="button"
                  className="text-purple-600 border-2 border-purple-600 text-xl px-4 py-2 rounded-md absolute bottom-9 left-7 w-[84%]"
                  onClick={handleMoneyTransfer}
                >
                  <img
                    src="/Plus.svg"
                    alt="Plus sign"
                    className="absolute  top-1/2 transform -translate-y-1/2 left-20"
                    style={{ width: "20px", height: "20px" }}
                  />
                  Add Money
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ShowGoals;
