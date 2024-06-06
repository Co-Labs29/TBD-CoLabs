import Sidebar from "./Sidebar"
import { Link } from "react-router-dom"

const Chores = () => {
  return (
    <div className="lg:mt-2">
        <Sidebar />
      <div className="flex justify-center">
        <div className="pt-[48px] flex-col items-center ">
        <p>Chores</p>
        <div>
        <Link
                type="button"
                to="/create_chore"
                onClick={() => {}}
                className="text-purple-800 border-2 border-purple-700 rounded-xl px-10 font-semibold py-2 mt-4 relative ml-auto mr-4"
              >
                <img
                  src="/Plus.svg"
                  alt="Plus sign"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2"
                  style={{ width: "20px", height: "20px" }}
                />
                Add Chore
              </Link>
              <button
                type="button"
                onClick={() => {}}
                className="text-purple-800 border-2 border-purple-700 rounded-xl pr-10 pl-[14px] font-semibold py-2 mt-4 relative ml-auto mr-4"
              >
                View Chores
                <img
                  src="/RightCaret.svg"
                  alt="Plus sign"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  style={{ width: "20px", height: "20px" }}
                />
              </button>
              
              </div>
        </div>
        </div>
    </div>
  )
}
export default Chores