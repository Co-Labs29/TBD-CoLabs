import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config/config";

const ChildSignUp = () => {
  const parent_id = sessionStorage.getItem("parentID");
  const url = config.backendURL;
  const navigate = useNavigate();
  const [childUser, setChildUser] = useState({
    username: "",
    password: "",
    parent_id: parent_id,
    role: "Child",
    selectedIcon: "Avatar1.svg", 
    availableIcons: [
      "Avatar1.svg",
      "Avatar2.svg",
      "Avatar3.svg",
      "Avatar4.svg",
      "Avatar5.svg",
      "Avatar6.svg",
      "Avatar7.svg",
      "Avatar8.svg",
    ],
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (childUser.password === confirmPassword) {
      const formData = {
        username: childUser.username,
        password: childUser.password,
        role: childUser.role,
        parent_id: childUser.parent_id,
        img: childUser.selectedIcon, 
      };
  
      try {
        const response = await fetch(`${url}/child_signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          console.log("in no ok statement")
          setError("Username already exists. Please choose a different username.");
          window.alert("Username already exist. Please choose a different username")

          return;
        } else {
          const data = await response.json();
          const token = data.token;
          localStorage.setItem("token", token);
          setShowMessage(true);
          navigate('/dashboard');
        }
      } catch (error) {
        console.error(error);
        setError("Error signing up. Please try again.");
      }
    } else {
      setError("Passwords do not match!");
    }
  };

  const handleCancel = () => {
    setChildUser({
      username: "",
      password: "",
      parent_id: "",
      role: "Child",
      selectedIcon: "Avatar1.svg",
      availableIcons: [
        "Avatar1.svg",
        "Avatar2.svg",
        "Avatar3.svg",
        "Avatar4.svg",
        "Avatar5.svg",
        "Avatar6.svg",
        "Avatar7.svg",
        "Avatar8.svg",
      ],
    });
    setConfirmPassword("");
    setError("");
    setShowMessage(false);
    navigate('/dashboard')
  };

  const handleIconSelect = (icon: string) => {
    setChildUser({ ...childUser, selectedIcon: icon });
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md border-2 border-gray-400 w-full max-w-lg">
          <h1 className="text-center font-bold text-xl mb-7">Add Child</h1>
          <form onSubmit={(e) => handleSignUp(e)}>
            <label
              htmlFor="userName"
              className="block text-gray-700 font-bold mb-2"
            >
              User Name
            </label>
            <input
              type="text"
              id="userName"
              placeholder="User Name"
              className="w-full px-3 py-2 mb-4 border rounded-lg"
              onChange={(e) =>
                setChildUser({ ...childUser, username: e.target.value })
              }
            />
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="w-full px-3 py-2 mb-4 border rounded-lg"
              onChange={(e) =>
                setChildUser({ ...childUser, password: e.target.value })
              }
            />
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-bold mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              className="w-full px-3 py-2 mb-4 border rounded-lg"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
           
            <label className="text-gray-700 font-bold mb-2 flex justify-center">
              Choose Icon
            </label>
            <div className="flex flex-wrap justify-center mb-4">
              {childUser.availableIcons.map((icon, index) => (
                <img
                  key={index}
                  src={`${icon}`} 
                  alt={`Icon ${index + 1}`}
                  className={
                    childUser.selectedIcon === icon
                      ? "w-12 h-12 border-2 border-purple-700 rounded-full cursor-pointer mr-2 mb-2"
                      : "w-12 h-12 rounded-full cursor-pointer mr-2 mb-2"
                  }
                  onClick={() => handleIconSelect(icon)}
                />
              ))}
            </div>
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
                Add Child
              </button>
            </div>
          </form>
          {showMessage && <div className="mt-4 text-red-600">{error}</div>}
        </div>
      </div>
    </>
  );
};

export default ChildSignUp;
