// import { useState } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Chores = () => {
  const navigate = useNavigate();
  // const [children, setChildren] = useState([])

  return (
    <div className="lg:mt-2 flex gap-[48px] justify-center md:justify-start">
      <Sidebar />
      <div className="md:pt-[48px] pt-[90px] text-center w-full flex flex-col items-center">
        <p className="font-bold">Chores</p>
        <div className="flex flex-col md:flex-row md:gap-4 w-full  px-4">
          <Link
            type="button"
            to="/create_chore"
            onClick={() => {}}
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
          <button
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
          </button>
        </div>
        <div>

        </div>
      </div>
    </div>
  );
};

export default Chores;
