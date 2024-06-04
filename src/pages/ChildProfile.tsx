import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

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
      <div className="flex flex-row">
        <Sidebar />
        <div className="flex flex-col justify-center mt-5 font-bold ml-80 pl-2">
          <h1 className="mb-16 text-2xl flex items-start ml-12">
            Child Profile
          </h1>
          <div className="flex flex-wrap">
            {childInfo.map((child: any, index: number) => (
              <div
                key={index}
                className="flex flex-col items-center mb-8"
                style={{ width: "120px" }}
              >
                <img
                  src={child.img}
                  alt="Child"
                  onClick={() => handleChildSelect(child)}
                  className={`w-10 m-1 cursor-pointer ${
                    selectedChild === child ? "border-purple-800" : ""
                  }`}
                />
                <p
                  className="font-normal text-center mt-1"
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
      </div>
  
      {selectedChild && (
        <div className="flex justify-center items-center">
          <div
            className="grid grid-cols-2 gap-4"
            style={{ gridTemplateRows: "160px 240px 400px" }}
          >
            <div
              className="m-2 shadow-xl order-1"
              style={{
                width: "350px",
                height: "160px",
                borderRadius: "8px",
                border: "1px solid lightgrey",
                padding: "20px",
                gap: "8px",
              }}
            >
              <h3 className="flex items-center justify-center">
                <img
                  src="/Wallet.svg"
                  alt="wallet icon"
                  style={{ width: "40px", height: "40px" }}
                />
                <span className="ml-2 font-bold text-3xl">Wallet</span>
              </h3>
              <h1 className="flex justify-center mt-7 font-bold text-5xl">
                ${selectedChild.wallet.amount}
              </h1>
            </div>
  
            <div
              className="m-2 shadow-xl order-3 self-start mt-5"
              style={{
                width: "350px",
                height: "500px",
                borderRadius: "8px",
                border: "1px solid lightgrey",
                padding: "20px",
                gap: "8px",
                overflowY: "auto", // Add overflow for vertical scrolling
              }}
            ></div>
  
            <div
              className="m-2 shadow-xl order-2 flex flex-col"
              style={{
                width: "400px",
                height: "500px",
                borderRadius: "8px",
                border: "1px solid lightgrey",
                padding: "20px",
              }}
            >
              <h3 className="flex items-center justify-center">
                <img
                  src="/Piggy.svg"
                  alt="Piggy"
                  style={{ width: "40px", height: "40px" }}
                />
                <span className="ml-2 font-bold text-3xl">Goals</span>
              </h3>
  
              <button
                type="button"
                onClick={handlegoalclick}
                className="text-purple-800 border-2 border-purple-700 rounded-xl px-10 py-2 mt-4 relative pr-1"
                style={{ width: "45%", height: "10%" }}
              >
                <img
                  src="/Plus.svg"
                  alt="Plus sign"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2"
                  style={{ width: "20px", height: "20px" }}
                />
                New Goal
              </button>
  
              <div
                className="overflow-y-auto"
                style={{ maxHeight: "calc(100% - 94px)" }} // Adjust as necessary
              >
                {selectedChild.goals.map((goal: any, index: number) => (
                  <div
                    key={index}
                    className="flex flex-col items-start mt-4"
                    style={{
                      backgroundColor: "#ECFAEB",
                      padding: "10px",
                      borderRadius: "8px",
                    }}
                  >
                    <div className="flex items-center">
                      <span className="text-4xl mr-4">{goal.img}</span>{" "}
                      {/* Display the emoji */}
                      <p className="font-bold">{goal.name}</p>
                    </div>
                    <div className="flex items-center mt-2 w-full justify-between">
                      <div className="flex-grow bg-gray-200 h-6 rounded-lg">
                        <div
                          className="h-full bg-green-400 rounded-lg"
                          style={{
                            width: `${
                              (parseInt(goal.paid) / parseInt(goal.amount)) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <p className="ml-4 mr-4">
                        ${goal.paid}/{goal.amount}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
  
  
};

export default ChildProfile;
