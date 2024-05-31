import { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config/config";

const ChildLogin = () => {
  const url = config.backendURL
  const [loginChild, setLoginChild] = useState({
    username: "",
    password: "",
    role: "child",
  });
  const [error, setError] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}/child_login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginChild),
      });

      if (!response.ok) {
        setError("Invalid username or password");
      }else{
        sessionStorage.setItem("role", "child");
        navigate('/childProfile')
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="p-8  w-full max-w-md">
        <form>
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            User Name
          </label>
          <input
            type="text"
            id="email"
            placeholder="User Name"
            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            onChange={(e) =>
              setLoginChild({ ...loginChild, username: e.target.value })
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
            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            onChange={(e) =>
              setLoginChild({ ...loginChild, password: e.target.value })
            }
          />
          <button
            type="submit"
            onClick={handleLogin}
            className="text-purple-800 border-2 border-purple-700 rounded-xl px-10 py-2 mt-4 md:mt-0 md:ml-24"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              display: "block",
            }}
          >
            Login
          </button>
        </form>
        {showErrorMessage && <div>{error}</div>}
      </div>
    </>
  );
};

export default ChildLogin;
