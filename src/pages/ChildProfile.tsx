import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import Calendar_ChildProfile from "../components/Calender/Calender_ChildProfile";
import config from "../config/config";

interface ChildInfo {
  parent_id: number;
  child_id: number;
  username: string;
  img: string;
  role: string;
  chores: { name: string; amount: number }[];
  wallet: { amount: number };
  goals: {
    id: number;
    name: string;
    amount: number;
    paid: number;
    description: string;
    img: string;
    link: string;
  }[];
}


const ChildProfile = () => {
  const navigate = useNavigate();
  const [childInfo, setChildInfo] = useState<ChildInfo[]>([]);
  const [selectedChild, setSelectedChild] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);


  const url = config.backendURL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError(new Error("You must be logged in to view this page"));
      setLoading(false);
      return;
    }

    const fetchChildInfo = async () => {
      try {
        const response = await fetch(`${url}/info`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch child information");
        }
        const data: ChildInfo[] = await response.json();
        setChildInfo(data);
        console.log(data)
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchChildInfo();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {(error as Error).message}</div>;
  }

  const handleChildSelect = (child: any) => {
    setSelectedChild(child);
    sessionStorage.setItem("selectedChildId", String(child.child_id));
  };

  const handlegoalclick = () => {
    navigate("/goals");
  };



  const handleGoalClick = (goal: any ) => {
    const goalId = goal.id
    sessionStorage.setItem("goalId", goalId)
    navigate("/ShowGoals");
  };

  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="flex flex-col mx-auto">
        <h1 className="flex mt-10 font-bold text-2xl lg:ml-2">Child Profile</h1>
        <div className="flex mt-10">
          {childInfo.map((child: any, index: number) => (
            <div key={index} className="ml-1" style={{ width: "120px" }}>
              <img
                src={child.img}
                alt="Child"
                onClick={() => handleChildSelect(child)}
                className={`w-10 m-1 ml-7 cursor-pointer ${
                  selectedChild === child ? "border-purple-800" : ""
                }`}
              />
              <p
                className="ml-3 text-xl font-semibold"
                style={{
                  width: "80px",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  color: selectedChild === child ? "purple" : "black",
                }}
              >
                {child.username}
              </p>
            </div>
          ))}
        </div>

        {selectedChild && (
          <div className="lg:mt-10 flex">
            <div className="lg:flex gap-4">
              <div className="flex-col lg:mt-">
                <div className="lg:w-[300px] h-[160px] w-[400px] rounded-[8px] border border-lightgrey mt-3">
                  <h3 className="flex justify-center items-center mt-9">
                    <img
                      src="/Wallet.svg"
                      alt="wallet icon"
                      style={{ width: "40px", height: "40px" }}
                    />
                    <span className="font-bold text-2xl ml-3">Wallet</span>
                  </h3>
                  <h1 className="font-bold text-4xl flex justify-center">
                    ${selectedChild.wallet.amount}
                  </h1>
                </div>
                <div className="lg:mt-4">
                  <div className="lg:w-[300px] h-[400px] rounded-[8px] border border-lightgrey mt-3 overflow-y-auto scrollbar-thin">
                    <h3 className="flex justify-center mt-3">
                      <img
                        src="/CircleCheck.svg"
                        alt="check mark"
                        style={{ width: "40px", height: "40px" }}
                      />
                      <span className="font-bold text-2xl flex justify-center ml-2 sticky">
                        Chores
                      </span>
                    </h3>
                    <div className="mt-10">
                      <Calendar_ChildProfile />
                    </div>
                    {selectedChild.chores.map((chore: any, index: any) => (
                      <div
                        key={index}
                        className="flex flex-col ml-2"
                        style={{
                          backgroundColor: "#ECFAEB",
                          padding: "10px",
                          borderRadius: "8px",
                          marginBottom: "10px",
                          width: "95%"
                        }}
                      >
                        <h1 className="ml-10 mt-2">{chore.name}</h1>
                        <h2 className="ml-10 mt-2">${chore.amount}</h2>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="md:w-[400px] h-[400px] rounded-[8px] border border-lightgrey p-[20px] gap-[8px] mt-3 overflow-y-auto scrollbar-thin">
                <h3 className="flex justify-center">
                  <img
                    src="/Piggy.svg"
                    alt="Piggy"
                    style={{ width: "40px", height: "40px" }}
                  />
                  <span className="font-bold text-2xl flex justify-center ml-3">
                    Goals
                  </span>
                </h3>

                <button
                  type="button"
                  onClick={handlegoalclick}
                  className="text-purple-800 border-2 border-purple-700 px-8 py-2 mt-4 relative ml-2 m-9 rounded-md"
                >
                  <img
                    src="/Plus.svg"
                    alt="Plus sign"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2"
                    style={{ width: "20px", height: "20px" }}
                  />
                  New Goal
                </button>

                <div className="goals-container">
                  {selectedChild.goals.map((goal: any, index: number) => (
                    <div
                      key={index}
                      className="flex flex-col relative cursor-pointer"
                      style={{
                        backgroundColor: "#ECFAEB",
                        padding: "10px",
                        borderRadius: "8px",
                        height: "100px",
                        marginBottom: "20px",
                      }}
                      onClick={() => handleGoalClick(goal)}
                    >
                      <div className="flex">
                        <span className="text-6xl mr-12 absolute">
                          {goal.img}
                        </span>
                        <p className="ml-32 font-semibold text-xl">
                          {goal.name}
                        </p>
                      </div>
                      <div className="flex mt-2">
                        <div className="bg-gray-200 h-4 rounded-xl ml-32 flex-grow relative">
                          <div
                            className="h-full bg-green-400 rounded-xl absolute"
                            style={{
                              width: `${
                                (parseInt(goal.paid) / parseInt(goal.amount)) *
                                100
                              }%`,
                            }}
                          ></div>
                          <p className="font-semibold pt-6">
                            ${goal.paid}/{goal.amount}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChildProfile;

