import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import Calendar_ChildProfile from "../components/Calender/Calender_ChildProfile";


const ChildProfile = () => {
  const navigate = useNavigate();
  const [childInfo, setChildInfo] = useState([]);
  const [selectedChild, setSelectedChild] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError(new Error("You must be logged in to view this page"));
      setLoading(false);
      return;
    }

    const fetchChildInfo = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/info", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch child information");
        }
        const data = await response.json();
        setChildInfo(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchChildInfo();
  }, []);

  // useEffect(() => {
  //   const selectedChildId = sessionStorage.getItem('selectedChildId');
  //   console.log('Selected Child ID:', selectedChildId);
  //   if (selectedChildId) {

  //     const selectedChild = childInfo.find((child: any) => child.id === parseInt(selectedChildId));
  //     console.log('Selected Child:', selectedChild);
  //     if (selectedChild) {
  //       setSelectedChild(selectedChild);
  //     } else {
  //       console.error('Selected child not found');
  //     }
  //   }
  // }, [childInfo]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {(error as Error).message}</div>;
  }

  const handleChildSelect = (child: any) => {
    setSelectedChild(child);
    console.log(child);
    console.log(selectedChild?.goals);
    sessionStorage.setItem("selectedChildId", String(child.child_id));
  };

  const handlegoalclick = () => {
    navigate("/goals");
  };
 
  return (
    <>
      <div className="">
        <Sidebar />
        <div className="md:flex md:flex-col md:justify-start lg:mr-96 lg:pr-60">
          <h1 className="flex flex-row justify-center mb-5 font-bold text-3xl lg:mt-9 lg:ml-72">
            Child Profile
          </h1>
          <div className="flex row justify-center lg:ml-96 lg:absolute lg:mt-40 lg:pl-60 pr-52">
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
        </div>

        {selectedChild && (
          <div className="md:flex justify-center sm:flex flex lg:mt-28 lg:static">
            <div
              className="md:grid grid-cols-2 gap-4 sm:mt-20"
              style={{
                gridTemplateRows: "160px 240px 400px",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              <div className="md:w-[300px] h-[160px] w-[400px] rounded-[8px] border border-lightgrey p-[20px] gap-[8px] ml-auto">
                <h3 className="flex justify-center">
                  <img
                    src="/Wallet.svg"
                    alt="wallet icon"
                    style={{ width: "40px", height: "40px" }}
                  />
                  <span className="font-bold text-2xl">Wallet</span>
                </h3>
                <h1 className="font-bold text-4xl flex justify-center">
                  ${selectedChild.wallet.amount}
                </h1>
              </div>

              <div className="md:w-[400px] h-[500px] w-[400px] rounded-[8px] border border-lightgrey p-[20px] gap-[8px] ml-auto">
                <h3 className="flex justify-center">
                  <img
                    src="/Piggy.svg"
                    alt="Piggy"
                    style={{ width: "40px", height: "40px" }}
                  />
                  <span className="font-bold text-2xl flex justify-center">
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
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 "
                    style={{ width: "20px", height: "20px" }}
                  />
                  New Goal
                </button>

                <div
                  className="overflow-y-auto"
                  style={{ maxHeight: "calc(100% - 120px)" }}
                >
                  {selectedChild.goals.map((goal: any, index: number) => (
                    <div
                      key={index}
                      className="flex flex-col relative"
                      style={{
                        backgroundColor: "#ECFAEB",
                        padding: "10px",
                        borderRadius: "8px",
                        height: "100px",
                        marginBottom: "20px",
                      }}
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

              <div className="md:w-[300px] h-[500px] rounded-[8px] border border-lightgrey p-[20px] gap-[8px] ml-auto">
              <h3 className="flex justify-center">
                  <img
                    src="/CircleCheck.svg"
                    alt="check mark"
                    style={{ width: "40px", height: "40px" }}
                  />
                  <span className="font-bold text-2xl flex justify-center">
                    Chores
                  </span>
                </h3>
                <div className="mt-12">
                <Calendar_ChildProfile />
                </div>
                  {selectedChild.chores.map((chore: any, index: any) =>
                    <div
                    key={index}
                    className="flex flex-col relative mt-12"
                    style={{
                      backgroundColor: "#ECFAEB",
                      padding: "10px",
                      borderRadius: "8px",
                      height: "100px",
                      marginBottom: "20px",
                    }}
                    >
                      <h1 className="ml-10 mt-2">{chore.name}</h1>
                      <h2 className="ml-10 mt-2">${chore.amount}</h2>
                    </div>
                  )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChildProfile;
