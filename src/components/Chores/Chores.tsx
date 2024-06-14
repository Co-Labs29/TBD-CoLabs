import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Calender from "../Calender/Calender";
import { Link, useNavigate } from "react-router-dom";
import config from "../../config/config";
import {
  ChildInfo,
  Chores as ChoresInterface,
  Wallet as ChoresWallet,
} from "types/types";
import "./chores.css";
import ChoreItem from "./ChoreItem";

const Chores = () => {
  const navigate = useNavigate();
  const url = config.backendURL;
  const [children, setChildren] = useState<ChildInfo[] | null>([]);
  const [selectedChildId, setSelectedChildId] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [chores, setChores] = useState<ChoresInterface[]>([]);
  const [error, setError] = useState("");
  const [currentChildInfo, setCurrentChildInfo] = useState<ChildInfo>({
    id: 0,
    child_id: 0,
    chores: [],
    goals: [],
    img: null,
    parent_id: 0,
    role: "",
    username: null,
    wallet: {} as ChoresWallet,
  });
  console.log("chores :>> ", chores);
  console.log("children :>> ", children);

  // Function to format date for database
  function formatDateForDB(dateString: Date) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handleChildClick = (childId: number) => {
    setSelectedChildId(childId);
  };
  console.log("object :>> ", sessionStorage.getItem("parentID"));

  const fetchChildren = async () => {
    const response = await fetch(
      `${url}/my_children/${sessionStorage.getItem("parentID")}`
    );
    const data = await response.json();
    console.log("data :>> ", data);
    if (response.ok) {
      setChildren(data);
      setSelectedChildId(data[0].id);
    }
  };

  const fetchChoresByChildAndDate = async (
    childId: number | null,
    date: string
  ) => {
    try {
      if (!childId && !sessionStorage.getItem("childId")) {
        setError("Please select a child");
        return;
      }
      if (sessionStorage.getItem("role") === "child") {
        childId = Number(sessionStorage.getItem("childId"));
      }
      const response = await fetch(`${url}/get_chores/${childId}/${date}`);
      const data = await response.json();
      // console.log('data :>> ', data);
      if (response.ok) {
        setChores(data.chores || []);
        setError(data.message || "");
      } else {
        setError(data.message || "Error fetching chores");
      }
    } catch (error) {
      console.error(error);
      setError("Error fetching chores");
    }
  };

  const fetchCurrentChild = async () => {
    try {
      const response = await fetch(
        `${url}/child_info/${sessionStorage.getItem("childId")}`
      );
      const data = await response.json();
      setCurrentChildInfo(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdatingStatus = async (choreId: number, status: string) => {
    try {
      const response = await fetch(`${url}/update_chore_status/${choreId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      const data = await response.json();
      console.log("data :>> ", data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdatingWalletOnApproval = async (
    childId: number,
    choreId: number
  ) => {
    try {
      const response = await fetch(
        `${url}/add_funds_to_wallet/${childId}/${choreId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log("data :>> ", data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateChoreStatus = (
    choreId: number,
    status: string,
    childId: number
  ) => {
    // Update the chore status in the state immediately
    setChores((prevChores) =>
      prevChores.map((chore) =>
        chore.id === choreId ? { ...chore, status } : chore
      )
    );
    // Call the function to update status on the server
    handleUpdatingStatus(choreId, status);
    handleUpdatingWalletOnApproval(childId, choreId);
  };

  useEffect(() => {
    fetchChildren();
    if (sessionStorage.getItem("role") === "child") fetchCurrentChild();
  }, []);

  useEffect(() => {
    // Only fetch chores if both selectedChildId and selectedDate are set
    setChores([]);
    if (
      (selectedChildId || sessionStorage.getItem("childId")) &&
      selectedDate
    ) {
      fetchChoresByChildAndDate(selectedChildId, formatDateForDB(selectedDate));
    }
  }, [selectedChildId, selectedDate]);

  return (
    <div className="lg:mt-2 flex justify-center md:justify-start">
      <Sidebar />
      <div className="md:pt-[48px] py-[90px]  flex flex-col items-center md:items-start gap-3 md:ml-[126px]">
        <p className="font-bold">Chores</p>
        {sessionStorage.getItem("role") === "parent" ? (
          <>
            <div className="flex flex-col md:flex-row md:gap-4 w-full px-4 md:px-0">
              <Link
                type="button"
                to="/create_chore"
                className="text-purple-800 border-2 border-purple-700 rounded-xl px-6 md:px-10 font-semibold py-2 mt-4 flex items-center justify-center"
              >
                <img
                  src="/Plus.svg"
                  alt="Plus sign"
                  className="mr-2"
                  style={{ width: "20px", height: "20px" }}
                />
                Add Chore
              </Link>
              <Link
                to="/parent_all_chores"
                type="button"
                onClick={() => navigate("/parent_all_chores")}
                className="text-purple-800 border-2 border-purple-700 rounded-xl px-6 md:px-10 font-semibold py-2 mt-4 flex items-center justify-center"
              >
                View Chores
                <img
                  src="/RightCaret.svg"
                  alt="Right arrow"
                  className="ml-2"
                  style={{ width: "20px", height: "20px" }}
                />
              </Link>
            </div>

            <div className="flex w-full justify-center flex-wrap flex-grow md:justify-start gap-[80px] mt-14 mb-6">
              {children &&
                children.map((child) => (
                  <div
                    key={child.id}
                    className="flex flex-col gap-4 items-center cursor-pointer w-[75px]"
                    onClick={() => handleChildClick(child.id)}
                  >
                    <img
                      src={`/${child.img}`}
                      alt="child_img"
                      className={`w-16 h-16 object-cover rounded-full ${
                        selectedChildId === child.id
                          ? "border-[3px] border-dark-purple"
                          : ""
                      }`}
                    />
                    <p
                      className="text-center"
                      style={{
                        width: "125px",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {child.username}
                    </p>
                  </div>
                ))}
            </div>
          </>
        ) : (
          <div className="flex w-full justify-center md:justify-start gap-[80px] mt-14 mb-6">
            {currentChildInfo && (
              <div className="flex flex-col gap-4 items-center cursor-pointer">
                <img
                  src={`/${currentChildInfo.img}`}
                  alt="child_img"
                  className="w-16 h-16 object-cover rounded-full"
                />
                <p>{currentChildInfo.username ?? "unkown user"}</p>
              </div>
            )}
          </div>
        )}
        
        <div className="w-full max-w-[928px] px-6 md:px-0">
          <Calender
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>

        <div className="flex flex-col w-full mt-12 gap-8 px-4 md:px-0">
          {chores.map((chore) => (
            <ChoreItem
              key={chore.id}
              chore={chore}
              updateChoreStatus={updateChoreStatus}
              handleUpdatingWalletOnApproval={handleUpdatingWalletOnApproval}
            />
          ))}
        </div>

        <p className="font-bold flex justify-center w-full max-w-[928px]">{error}</p>
      </div>
    </div>
  );
};

export default Chores;
