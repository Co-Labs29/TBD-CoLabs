import { useState } from "react";
import Navbar from "../Navbar";
import config from "../../config/config";
import { useNavigate } from "react-router-dom";


const ParentSignup = () => {
  const url = config.backendURL;
  const [parentUser, setParentUser] = useState({
    first_name: "",
    email: "",
    password: "",
    role: "Parent"
  });
  const [error, setError] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}/parent_signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parentUser)
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Error signing up. Please try again.");
        setShowMessage(true);
      } else {
        const data = await response.json();
        const token = data.token; 
        localStorage.setItem("token", token); 
        setShowMessage(true);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      setError("Error signing up. Please try again.");
      setShowMessage(true);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen" id="signup">
        <form className="bg-white p-8 rounded-lg shadow-md border-2 border-gray-400 w-full max-w-lg" onSubmit={handleSignUp}>
          <h1 className="text-center font-bold text-xl mb-7">Sign up</h1>
          <input
            type="text"
            value={parentUser.first_name}
            onChange={(e) => setParentUser({ ...parentUser, first_name: e.target.value })}
            placeholder="First Name"
            required
            className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
          />
         
          <input
            type="email"
            value={parentUser.email}
            onChange={(e) => setParentUser({ ...parentUser, email: e.target.value })}
            placeholder="Email"
            required
            className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="password"
            value={parentUser.password}
            onChange={(e) => setParentUser({ ...parentUser, password: e.target.value })}
            placeholder="Password"
            required
            className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="password"
         
            placeholder="Confirm Password"
            required
            className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
          />
         
          <button
            type="submit"
            className="text-purple-800 border-2 border-purple-700 rounded-xl px-10 py-2 mt-4 md:mt-0 md:ml-24"
            style={{ marginLeft: "auto", marginRight: "auto", display: "block" }}
          >
            Signup
          </button>
        {showMessage && <div className="mt-5 ml-36 text-red-600">{error}</div>}
        </form>

      </div>
    </>
  );
};

export default ParentSignup;

