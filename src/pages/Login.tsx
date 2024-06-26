import { useState } from "react";
import ParentLogin from "../components/ParentLogin/login";
import ChildLogIn from "../components/ChildLogIn/ChildLogIn";
import Navbar from "../components/Navbar";

const Login = () => {
  const [selectedOption, setSelectedOption] = useState("parent");

  return (
    <>
    <Navbar />
    <div className="flex items-center justify-center min-h-screen" id="signup">
      <div className="bg-white p-8 rounded-lg shadow-md border-2 border-gray-300 w-full max-w-md">
        <h1 className="text-center font-bold text-xl mb-7">Login</h1>
        <div className="flex justify-around mb-4">
          <button
            className={`focus:outline-none text-lg ${
              selectedOption === "parent"
                ? "border-b-2 border-purple-800 text-purple-900 font-bold"
                : "text-purple-800"
            }`}
            onClick={() => setSelectedOption("parent")}
          >
            Parent
          </button>
          <button
            className={`focus:outline-none text-lg ${
              selectedOption === "child"
                ? "border-b-2 border-purple-800 text-purple-900 font-bold"
                : "text-purple-800"
            }`}
            onClick={() => setSelectedOption("child")}
          >
            Child
          </button>
        </div>
        {selectedOption === "parent" ? (
          <ParentLogin />
        ) : (
          <ChildLogIn />
        )}
      </div>
    </div>
    </>
  );
};

export default Login;





