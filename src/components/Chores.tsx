import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Calender from "../components/Calender/Calender";
import { Link, useNavigate } from "react-router-dom";
import config from "../config/config";
import { ChildInfo, Chores as ChoresInterface } from "types/types";

const Chores = () => {
  const navigate = useNavigate();
  const url = config.backendURL;
  const [children, setChildren] = useState<ChildInfo[]>([]);
  const [selectedChildId, setSelectedChildId] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [chores, setChores] = useState<ChoresInterface[]>([]);
  const [error, setError] = useState("");

  // Function to format date for database
  function formatDateForDB(dateString:Date) {

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }


  const handleChildClick = (childId:number) => {
    setSelectedChildId(childId);
  };



  const fetchChildren = async () => {
    const response = await fetch(
      `${url}/my_children/${sessionStorage.getItem("parentID")}`
    );
    const data = await response.json();
    if (response.ok) {
      setChildren(data);
    }
  };

  const fetchChoresByChildAndDate = async (childId:number, date:string) => {
    try {
      if (!childId) {
        setError("Please select a child");
        return;
      }
      const response = await fetch(`${url}/get_chores/${childId}/${date}`);
      const data = await response.json();
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


  useEffect(() => {
    fetchChildren();
  }, []);


  useEffect(() => {
    // Only fetch chores if both selectedChildId and selectedDate are set
    setChores([]);
    if (selectedChildId && selectedDate) {
      fetchChoresByChildAndDate(selectedChildId, formatDateForDB(selectedDate));
    }
  }, [selectedChildId, selectedDate]);

  return (
    <div className="lg:mt-2 flex justify-center md:justify-start">
      <Sidebar />
      <div className="md:pt-[48px] pt-[90px] text-center w-full flex flex-col items-center gap-3 md:mx-[126px]">
      <p className="font-bold">Chores</p>

        <div className="flex flex-col md:flex-row md:gap-4 w-full px-4">

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
        <div className="flex w-full justify-center md:justify-start gap-[80px] mt-14 mb-6">
          {children &&
            children.map((child) => (
              <div
                key={child.id}
                className={`flex flex-col gap-4 items-center cursor-pointer `}
                onClick={() => handleChildClick(child.id)}
              >
                <img
                  src={`/${child.img}`}
                  alt="child_img"
                  className={`w-16 h-16 object-cover rounded-full ${
                  selectedChildId === child.id
                    ? "border-[3px] border-dark-purple rounded-full"
                    : ""
                }`}
                />
               <p>{child.username}</p> 
              </div>
            ))}
        </div>

        <div className="w-full px-6 md:px-0">
          <Calender
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>
        <div className="flex flex-col w-full mt-12 gap-8 px-4 md:px-0">
          {chores &&
            chores.map((chore) => (
              <div className="flex gap-6 bg-lightish-purple md:w-[362px] px-10 py-4 rounded-[8px]">
                <div className="flex flex-col gap-4">
                  <p className="text-[18px]">{chore.name}</p>
                  <p className="text-start text-[18px]">${chore.amount}</p>
                </div>
              </div>
            ))}
        </div>
        <p>{error}</p>

      </div>
    </div>
  );
};

export default Chores;
