import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config/config";

const ParentSignup = () => {
  const url = config.backendURL;
  const [parentUser, setParentUser] = useState({
    first_name: "",
    email: "",
    password: "",
    role: "Parent"
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (parentUser.password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(`${url}/parent_signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parentUser)
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Error signing up. Please try again.");
      } else {
        const data = await response.json();
        const token = data.token; 
        localStorage.setItem("token", token); 
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      setError("Error signing up. Please try again.");
    }
  };

  const handleCancel = () => {
    setParentUser({
      first_name: "",
      email: "",
      password: "",
      role: "Parent"
    });
    setConfirmPassword("");
    setError("");
    navigate("/login");
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md border-2 border-gray-400 w-full max-w-lg">
          <h1 className="text-center font-bold text-xl mb-7">Parent Signup</h1>
          <form onSubmit={(e) => handleSignUp(e)}>
            <label htmlFor="firstName" className="block text-gray-700 font-bold mb-2">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              className="w-full px-3 py-2 mb-4 border rounded-lg"
              onChange={(e) => setParentUser({ ...parentUser, first_name: e.target.value })}
            />
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="w-full px-3 py-2 mb-4 border rounded-lg"
              onChange={(e) => setParentUser({ ...parentUser, email: e.target.value })}
            />
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="w-full px-3 py-2 mb-4 border rounded-lg"
              onChange={(e) => setParentUser({ ...parentUser, password: e.target.value })}
            />
            <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              className="w-full px-3 py-2 mb-4 border rounded-lg"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="flex justify-between">
              <button
                type="button"
                className="text-purple-800 border-2 border-purple-700 rounded-xl px-6 py-2 mt-4"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="text-purple-800 border-2 border-purple-700 rounded-xl px-10 py-2 mt-4"
              >
                Sign Up
              </button>
            </div>
          </form>
          {error && <div className="mt-4 text-red-600 flex justify-center">{error}</div>}
        </div>
      </div>
    </>
  );
};

export default ParentSignup;


